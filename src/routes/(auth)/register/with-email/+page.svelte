<svelte:head>
	<title>Register with email | Portcullis</title>
</svelte:head>

<h1 class="mb-8 font-display text-4xl font-semibold">Register with email</h1>

<div class="mb-4 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Email</p>
	<input type="email" class="input-auth" />
</div>

<div class="mb-4 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Display Name</p>
	<input type="text" class="input-auth" />
</div>

<div class="mb-4 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Password</p>
	<input type="password" class="input-auth" />
</div>

<div class="mb-8 flex flex-col gap-2">
	<p class="font-light text-neutral-500">Confirm Password</p>
	<input type="password" class="input-auth" />
</div>

<button class="btn-primary mb-8">
	<span>Submit</span>
</button>

<a href="/register" class="link flex items-center gap-1">
	<i class="bi bi-arrow-left"></i>
	<span>Back</span>
</a>
