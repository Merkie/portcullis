<svelte:head>
	<title>Register with email | Portcullis</title>
</svelte:head>

<h1 class="mb-8 font-display text-4xl font-semibold">Register with email</h1>

<a href="/register/with-email" class="auth-btn mb-4">
	<i class="bi bi-envelope"></i>
	<span>Continue with Email</span>
</a>

<button class="auth-btn mb-8" disabled={true}>
	<img src="/images/google-icon-small.png" width={20} alt="Google Logo" />
	<span>Continue with Google</span>
</button>

<p>
	Already have an account? <a href="/login" class="link">Login</a>
</p>
