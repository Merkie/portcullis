<script lang="ts">
	import slugify from 'slugify';

	let name = $state('');
	let slug = $derived(slugify(name, { strict: true, lower: true }));

	async function submit() {}
</script>

<h1 class="mb-8 pr-8 font-display text-3xl font-semibold">Create new organization</h1>

<div class="mb-8 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Organization Name</p>
	<input bind:value={name} type="email" class="input-auth" />
</div>

{#if slug}
	<div class="mb-8 flex flex-col gap-2">
		<p class="font-light text-neutral-500">Your Domain:</p>
		<p class="text-neutral-500">
			<span class="text-white">{slug}</span><span>{`.tryportcullis.com`}</span>
		</p>
	</div>
{/if}

<button on:click={submit} class="btn-primary mb-8">
	<span>Submit</span>
</button>

<p>
	<a href="/org/select" class="link">Select organization</a>
</p>
