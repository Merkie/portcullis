<script>
	import { Mail } from 'lucide-svelte';
</script>

<svelte:head>
	<title>Login | Portcullis</title>
</svelte:head>

<h1 class="mb-8 font-display text-4xl font-semibold">Login</h1>

<button class="auth-btn mb-4">
	<Mail size={20} />
	<span>Continue with Email</span>
</button>

<button class="auth-btn mb-8" disabled={true}>
	<img src="/images/google-icon-small.png" width={20} alt="Google Logo" />
	<span>Continue with Google</span>
</button>

<p>
	Don't have an account? <a href="/register" class="link">Register</a>
</p>
