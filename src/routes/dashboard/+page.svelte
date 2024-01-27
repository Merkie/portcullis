<script lang="ts">
	async function signOut() {
		await fetch('/api/auth/signout', {
			method: 'POST'
		}).then((res) => res.json());
		window.location.reload();
	}
</script>

<p class="m-16">This is a protected Route!</p>

<button class="btn-auth m-16 w-96" on:click={signOut}>Sign Out</button>
