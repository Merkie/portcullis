import { json } from '@sveltejs/kit';

export const POST = async ({ params: { org_id }, cookies, locals: { prisma, user } }) => {
	const membership = await prisma.organizationMembership.findFirst({
		where: {
			organizationId: org_id,
			userId: user.id
		}
	});

	if (!membership)
		return json({ success: false, error: 'You are not a member of this organization' });

	cookies.set('portcullis-org-membership', membership.id, {
		path: '/',
		maxAge: 60 * 60 * 24 * 90,
		sameSite: 'lax',
		httpOnly: true
	});

	return json({ success: true });
};
