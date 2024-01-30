<script lang="ts">
	let email = $state('');
	let password = $state('');

	let error = $state('');

	async function submit() {
		error = '';

		const response = await fetch('/api/auth/email/login', {
			method: 'POST',
			body: JSON.stringify({ email, password })
		}).then((res) => res.json());

		if (response.error) {
			if (typeof response.error === 'string') return (error = response.error);
			return (error = 'Invalid input');
		}

		if (response.success) return window.location.assign('/org/select');
	}
</script>

<svelte:head>
	<title>Login with email | Portcullis</title>
</svelte:head>

<h1 class="mb-8 font-display text-4xl font-semibold">Login with email</h1>

<div class="mb-4 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Email</p>
	<input bind:value={email} type="email" class="input-auth" />
</div>

<div class="mb-4 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Password</p>
	<input bind:value={password} type="password" class="input-auth" />
</div>

{#if error}
	<p class="mb-4 text-red-500">Error: {error}</p>
{/if}

<button on:click={submit} class="btn-primary mb-8">
	<span>Submit</span>
</button>

<a href="/login" class="link flex items-center gap-1">
	<i class="bi bi-arrow-left"></i>
	<span>Back</span>
</a>
