import { redirect, type Handle } from '@sveltejs/kit';
import prisma from '$lib/resources/prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { User } from '@prisma/client';

export const handle: Handle = async ({ event, resolve }) => {
	// Add prisma
	event.locals.prisma = prisma;

	// decode cookies & fetch new data
	const [user, orgMembership] = await Promise.all([
		getDecodedToken(event.cookies.get('portcullis-token') || ''),
		prisma.organizationMembership.findFirst({
			where: {
				id: event.cookies.get('portcullis-org-membership') || ''
			},
			include: {
				organization: true
			}
		})
	]);

	// Set the locals
	if (user) event.locals.user = user;
	if (orgMembership) event.locals.orgMembership = orgMembership;

	// Add route protection
	const url = new URL(event.request.url);
	if (!event.locals.user) {
		// protect org route
		if (url.pathname.startsWith('/org')) throw redirect(307, '/login');
		// protect api routes besides /api/auth/*
		if (url.pathname.startsWith('/api') && !url.pathname.startsWith('/api/auth'))
			throw redirect(307, '/login');
		// protect dashboard
		if (url.pathname.startsWith('/dashboard')) throw redirect(307, '/login');
	}

	if (!event.locals.orgMembership) {
		// protect org routes
		if (url.pathname.startsWith('/dashboard')) throw redirect(307, '/org/select');
	}

	return await resolve(event);
};

async function getDecodedToken(token: string): Promise<User | null> {
	try {
		const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
		if (!decoded || !decoded.id) throw new Error('Invalid token');

		const fetchedUser = await prisma.user.findUnique({
			where: {
				id: decoded.id
			}
		});
		if (!fetchedUser || !fetchedUser.id) throw new Error('User not found');

		// @ts-expect-error - We don't want to send the password hash to the client
		delete fetchedUser.passwordHash;

		return fetchedUser;
	} catch {
		return null;
	}
}
