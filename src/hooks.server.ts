import { redirect, type Handle } from '@sveltejs/kit';
import prisma from '$lib/resources/prisma';
import jwt from 'jsonwebtoken';
import { JWT_SECRET, NODE_ENV } from '$env/static/private';
import type { User } from '@prisma/client';
import { PUBLIC_DOMAIN } from '$env/static/public';

export const handle: Handle = async ({ event, resolve }) => {
	// Add prisma
	event.locals.prisma = prisma;

	// Add auth token
	event.locals.user = (await getDecodedToken(event.cookies.get('portcullis-token') || ''))!;

	const url = new URL(event.request.url);
	const orgSubdomain = getSubdomain(url);

	if (orgSubdomain) {
		// Check if org exists
		const urlOrg = await prisma.organization.findFirst({
			where: {
				slug: orgSubdomain
			}
		});
		// If org does not exist, redirect to org select
		if (!urlOrg)
			throw redirect(
				307,
				`${NODE_ENV === 'development' ? 'http://' : 'https://'}${PUBLIC_DOMAIN}/org/select`
			);

		const orgPublicRoutes = [
			// '/admin/login',
			// '/client/login',
			// '/api/auth/org/login',
			'/login',
			'/api/auth'
		];
		const isUrlPublicRoute = orgPublicRoutes
			.map((route) => url.pathname.startsWith(route))
			.includes(true);
		// Just resolve the event, we dont need the user or membership
		if (isUrlPublicRoute) return await resolve(event);

		if (event.locals.user && event.locals.user.id) {
			// Check if user is a member of the org
			const fetchedMembership = await prisma.organizationMembership.findFirst({
				where: {
					userId: event.locals.user.id,
					organization: {
						slug: orgSubdomain
					}
				},
				include: {
					organization: true
				}
			});
			if (fetchedMembership) event.locals.orgMembership = fetchedMembership;
		}

		// If there is no membership, redirect to login
		if (!event.locals.orgMembership) throw redirect(307, '/login');
	} else {
		// If we are not using an org subdomain
		if (!event.locals.user || !event.locals.user.id) {
			// if unauthed is attempting to access dashboard or api, redirect to login
			if (url.pathname.startsWith('/org')) throw redirect(307, '/login');
			if (url.pathname.startsWith('/api') && !url.pathname.startsWith('/api/auth'))
				throw redirect(307, '/login');
		}
	}

	return await resolve(event);
};

function getSubdomain(url: URL) {
	const subdomain = url.hostname.split('.')[0];
	const publicSubdomains = ['www', 'tryportcullis', 'localhost'];
	const hasOrgSubdomain = !publicSubdomains.includes(subdomain);
	if (hasOrgSubdomain) return subdomain;

	return null;
}

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
