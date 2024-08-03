<script>
	import '../app.css';
	import OrigamiIcon from '$lib/icons/origamiIcon.svelte';
</script>

<svelte:head>
	<title>origami.puntogris</title>
</svelte:head>

<div class="container mx-auto flex min-h-screen max-w-5xl flex-col p-6">
	<header class="flex items-center gap-2">
		<OrigamiIcon class="h-7 w-7" />
		<h1 class="text-2xl font-medium">origami.</h1>
	</header>
	<slot />
</div>
