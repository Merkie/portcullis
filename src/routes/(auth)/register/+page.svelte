<svelte:head>
	<title>Register | Portcullis</title>
</svelte:head>

<h1 class="mb-8 font-display text-4xl font-semibold">Register</h1>

<a href="/register/with-email" class="btn-auth mb-4">
	<i class="bi bi-envelope"></i>
	<span>Continue with Email</span>
</a>

<button class="btn-auth mb-8" disabled={true}>
	<img src="/images/google-icon-small.png" width={20} alt="Google Logo" />
	<span>Continue with Google</span>
</button>

<p>
	Already have an account? <a href="/login" class="link">Login</a>
</p>
