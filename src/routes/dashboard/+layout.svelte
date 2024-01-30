<script lang="ts">
	import {
		CreditCard,
		Files,
		FormInput,
		Home,
		MessageSquare,
		PhoneCall,
		Plug,
		Users
	} from 'lucide-svelte';

	const { data } = $props();
</script>

<svelte:head>
	<title>Dashboard | Portcullis</title>
</svelte:head>

<main class="flex h-screen w-screen">
	<!-- Side Nav -->
	<div class="flex h-full min-w-[300px] flex-col border-r border-neutral-900">
		<!-- Logo -->
		<div class="mb-4 flex items-center gap-4 border-b border-neutral-900 p-8">
			<!-- <Command /> -->
			<p class="text-nowrap font-display text-2xl font-semibold">
				{data.orgMembership.organization.name}
			</p>
		</div>
		<!-- Nav Items -->
		<a href={'/dashboard'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<Home />
			<span>Home</span>
		</a>
		<a href={'/dashboard/clients'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<Users />
			<span>Clients</span>
		</a>
		<div class="my-6 h-[1px] border-t border-neutral-900"></div>
		<p class="mb-2 ml-8 font-display font-medium text-neutral-500">Paths</p>
		<a href={'/dashboard/chat'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<MessageSquare />
			<span>Chat</span>
		</a>
		<a href={'/dashboard/files'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<Files />
			<span>Files</span>
		</a>
		<a href={'/dashboard/forms'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<FormInput />
			<span>Forms</span>
		</a>
		<a href={'/dashboard/billing'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<CreditCard />
			<span>Billing</span>
		</a>
		<a href={'/dashboard/helpdesk'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<PhoneCall />
			<span>Helpdesk</span>
		</a>
		<div class="my-6 h-[1px] border-t border-neutral-900"></div>
		<p class="mb-2 ml-8 font-display font-medium text-neutral-500">Management</p>
		<a href={'/dashboard/integrations'} class="flex items-center gap-3 p-3 px-8 text-xl">
			<Plug />
			<span>Integrations</span>
		</a>
	</div>
	<div class="flex flex-1 flex-col">
		<slot><!-- optional fallback --></slot>
	</div>
</main>
