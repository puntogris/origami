<script lang="ts">
	import { twMerge } from 'tailwind-merge';

	export let variant: 'solid' | 'outline' = 'solid';
	export let type: 'button' | 'submit' = 'button';
</script>

<button
	{type}
	disabled={$$props.disabled}
	on:click
	class={twMerge(
		'rounded border p-2 px-5 text-sm',
		variant === 'solid'
			? 'border-transparent bg-slate-950 text-white hover:bg-slate-800'
			: 'border-slate-950 text-slate-950 hover:bg-slate-50',
		$$props.class
	)}
>
	<slot />
</button>
