<script lang="ts">
	import slugify from 'slugify';

	let name = '';
	$: slug = slugify(name, { strict: true, lower: true });

	let isSlugValid: boolean | null = null;

	$: if (name) {
		isSlugValid = null;
		fetch(`/api/org/validate-slug`, {
			method: 'POST',
			body: JSON.stringify({ name })
		})
			.then((res) => res.json())
			.then((res) => {
				isSlugValid = res.success;
			});
	}

	async function createOrg() {
		const orgCreationResp = await fetch(`/api/org/create`, {
			method: 'POST',
			body: JSON.stringify({ name })
		}).then((res) => res.json());

		if (orgCreationResp.success) window.location.assign('/org/select');
	}
</script>

<svelte:head>
	<title>Create organization | Portcullis</title>
</svelte:head>

<h1 class="font-display mb-8 pr-8 text-3xl font-semibold">Create new organization</h1>

<div class="mb-8 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Organization Name</p>
	<input bind:value={name} type="text" class="input-auth" />
</div>

{#if slug}
	<div class="mb-8 flex flex-col gap-2">
		<p class="font-light text-neutral-500">Your Domain:</p>
		<div class="flex items-center gap-4">
			<p class="text-neutral-500">
				<span class="text-white">{slug}</span><span>{`.tryportcullis.com`}</span>
			</p>
			{#if isSlugValid === true}
				<span class="text-lime-400">Available <i class="bi bi-check-lg"></i></span>
			{/if}
			{#if isSlugValid === false}
				<span class="text-red-500">Unavailable <i class="bi bi-x-lg"></i></span>
			{/if}
			{#if isSlugValid === null}
				<span class="text-neutral-500">Checking...</span>
			{/if}
		</div>
	</div>
{/if}

<button on:click={createOrg} class="btn-primary mb-8">
	<span>Submit</span>
</button>

<p>
	<a href="/org/select" class="link">Select organization</a>
</p>
