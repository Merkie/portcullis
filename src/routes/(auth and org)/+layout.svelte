<main class="flex h-screen w-screen flex-col">
	<!-- Top Section (Logo) -->
	<div class="flex gap-8 border-b border-neutral-900 p-8">
		<a href="/" class="flex items-center gap-4 font-display text-2xl font-semibold">
			<img width={25} src="/images/portcullis-logo.png" alt="Portcullis Logo" />
			<span class="translate-y-[1px]">Portcullis</span>
		</a>
	</div>
	<!-- Content -->
	<div class="grid flex-1 place-items-center">
		<div
			class="flex w-[95%] min-w-[500px] max-w-[700px] flex-col rounded-lg border border-neutral-900 p-8 sm:w-fit"
		>
			<slot />
		</div>
	</div>
	<!-- Footer (Links) -->
	<div class="flex items-center justify-end gap-8 border-t border-neutral-900 p-8">
		<a href="/privacy" class="link">Privacy Policy</a>
		<a href="/terms" class="link">Terms of Service</a>
		<div class="h-1 w-1 rounded-full bg-white"></div>
		<p>Copyright 2023 Portcullis</p>
	</div>
</main>
