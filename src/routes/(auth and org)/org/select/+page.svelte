<script lang="ts">
	import { PUBLIC_DOMAIN } from '$env/static/public';
	import type { Organization, OrganizationMembership } from '@prisma/client';

	const { data } = $props() as {
		data: {
			memberships: (OrganizationMembership & { organization: Organization })[];
		};
	};
</script>

<h1 class="mb-8 pr-8 font-display text-3xl font-semibold">Select your organization</h1>

<div class="mb-8 flex flex-col gap-4">
	{#each data.memberships as membership}
		<a
			href={`http://${membership.organization.slug}.${PUBLIC_DOMAIN}:5173/login`}
			class="btn border border-neutral-900 p-3 text-lg">{membership.organization.name}</a
		>
	{/each}
</div>

<p>
	<a href="/org/create" class="link">Create new organization</a>
</p>
