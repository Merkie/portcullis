<script lang="ts">
	const { data } = $props();
</script>

<svelte:head>
	<title>Dashboard | Portcullis</title>
</svelte:head>

<div class="border-b border-neutral-900 p-8">
	<h1 class="font-display text-2xl">{data.app.at(0)?.toUpperCase() + data.app.slice(1)}</h1>
</div>
