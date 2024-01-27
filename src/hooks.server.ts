import { redirect, type Handle } from '@sveltejs/kit';
import prisma from '$lib/resources/prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { User } from '@prisma/client';

export const handle: Handle = async ({ event, resolve }) => {
	event.locals.prisma = prisma;

	const authToken = event.cookies.get('portcullis-token');
	if (authToken) {
		try {
			const decoded = jwt.verify(authToken, JWT_SECRET) as { id: string };
			if (!decoded || !decoded.id) throw new Error('Invalid token');

			const fetchedUser = await prisma.user.findUnique({
				where: {
					id: decoded.id
				}
			});
			if (!fetchedUser || !fetchedUser.id) throw new Error('User not found');

			// @ts-expect-error - We don't want to send the password hash to the client
			delete fetchedUser.passwordHash;

			event.locals.user = fetchedUser as User;
		} catch {
			event.locals.user = null as unknown as User;
		}
	}

	if (!event.locals.user || !event.locals.user.id) {
		const { pathname } = new URL(event.request.url);
		if (pathname.startsWith('/dashboard')) throw redirect(307, '/login');
		if (pathname.startsWith('/api') && !pathname.startsWith('/api/auth'))
			throw redirect(307, '/login');
	}

	console.log({ user: event.locals.user });

	return await resolve(event);
};
