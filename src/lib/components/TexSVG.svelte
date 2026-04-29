<script>
	import { onMount } from 'svelte';
	import { loadMathJax } from '$lib/mathjax';
	let { latex, display = true, packages = ['base', 'ams'], renderPreview = false } = $props();
	let svg = $state('');
	let error = $state('');
	let ready = $state(false);

	onMount(async () => {
		await loadMathJax(packages);
		ready = true;
	});
	$effect(async () => {
		if (!latex && renderPreview) {
			latex = String.raw`\text{LaTeX Preview Output}`;
			error = '';
		}
		if (!ready || !latex) {
			svg = '';
			error = '';
			return;
		}
		try {
			const result = await MathJax.tex2svgPromise(latex, { display });
			svg = MathJax.startup.adaptor.outerHTML(result);
			error = '';
		} catch (e) {
			error = e.message;
			svg = '';
		}
	});
</script>
{#if error}
	<div class="latex-error">{error}</div>
{:else if svg}
	{@html svg}
{:else if !ready}
	<span class="latex-loading">is no ready yet, wait</span>
{/if}
<style>
	* {
		font-family: Helvetica, Arial, sans-serif;
	}
	.latex-error {
		color: red;
	}
	:global(mjx-container) {
		display: inline !important;
		text-align: left !important;
	}
	:global(mjx-container svg g[data-mml-node="merror"] rect) {
		fill: white !important;
		stroke: white !important;
	}
</style>
