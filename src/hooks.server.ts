import { redirect, type Handle } from '@sveltejs/kit';
import prisma from '$lib/resources/prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '$env/static/private';
import type { Organization, OrganizationMembership, User } from '@prisma/client';

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

	const url = new URL(event.request.url);

	if (!event.locals.user || !event.locals.user.id) {
		// if unauthed is attempting to access dashboard or api, redirect to login
		if (url.pathname.startsWith('/dashboard')) throw redirect(307, '/login');
		if (url.pathname.startsWith('/api') && !url.pathname.startsWith('/api/auth'))
			throw redirect(307, '/login');
	}

	event.locals.orgMembership = null as unknown as OrganizationMembership & {
		organization: Organization;
	};
	const subdomain = url.hostname.split('.')[0];
	if (!['www', 'postcullis', 'localhost'].includes(subdomain)) {
		const fetchedMembership = await prisma.organizationMembership.findFirst({
			where: {
				userId: event.locals.user.id,
				organization: {
					slug: subdomain
				}
			},
			include: {
				organization: true
			}
		});
		if (!fetchedMembership) throw redirect(307, '/org/select');

		event.locals.orgMembership = fetchedMembership;
	}

	if (!event.locals.orgMembership) {
		if (url.pathname.startsWith('/dashboard')) throw redirect(307, '/org/select');
	}

	return await resolve(event);
};
