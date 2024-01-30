<script lang="ts">
	import type { Organization, OrganizationMembership } from '@prisma/client';

	export let data: {
		memberships: (OrganizationMembership & { organization: Organization })[];
	};

	async function setOrganization(orgId: string) {
		await fetch(`/api/org/${orgId}/select`, {
			method: 'POST'
		});
	}
</script>

<svelte:head>
	<title>Select organization | Portcullis</title>
</svelte:head>

<h1 class="font-display mb-8 pr-8 text-3xl font-semibold">Select your organization</h1>

<div class="mb-8 flex flex-col gap-4">
	{#each data.memberships as membership}
		<button
			on:click={async () => {
				await setOrganization(membership.organizationId);
				window.location.assign('/dashboard');
			}}
			class="btn border border-neutral-900 p-3 text-lg">{membership.organization.name}</button
		>
	{/each}
</div>

<p>
	<a href="/org/create" class="link">Create new organization</a>
</p>
