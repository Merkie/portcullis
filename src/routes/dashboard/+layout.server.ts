export const load = async ({ locals: { orgMembership } }) => {
	return {
		org: orgMembership.organization
	};
};
