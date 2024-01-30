import { redirect } from '@sveltejs/kit';

export const load = async ({ locals: { prisma, user } }) => {
	const memberships = await prisma.organizationMembership.findMany({
		where: {
			userId: user.id
		},
		include: {
			organization: true
		}
	});

	if (memberships.length === 0) throw redirect(307, '/org/create');

	return {
		memberships
	};
};
