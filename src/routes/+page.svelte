<svelte:head>
	<title>Latex List</title>
</svelte:head>

<script>
	import MathSVG from 'svelte-tex/package/MathSVG.svelte';
	let equations = $state([]);
	let equationText = $state(String.raw``);
	const options = {
		loader: {load: ['[tex]/color']},
		text: {
			packages: {'[+]': ['color']}
		}
	};
	function addEquation(event) {
		event.preventDefault();
		event.target.reset();
		if (equationText) {
			equations.push(equationText);
		}
	}
	function removeEquation() {
		equations.pop();
	}
	function checkKey(event) {
		if (event.key === 'Enter' && event.shiftKey) {
			event.preventDefault();
		}
	}
</script>
<main>
	<ul>
		{#each equations as equation}
			<li><MathSVG tex={equation} texOptions={options} /></li>
		{/each}
	</ul>
	<form onsubmit={addEquation}>
		<textarea onkeydown={checkKey} bind:value={equationText}>Put LaTeX here</textarea>
		<br />
		<p><MathSVG tex={equationText || String.raw`\text{LaTeX Preview Output}`} texOptions={options} /></p>
		<input type="submit" value="Add equation" />
	</form>
	<button onclick={removeEquation}>Remove equation</button>
</main>
<style>
	* {
		font-family: Helvetica, Arial, sans-serif;
	}
	input, button {
		font-size: inherit;
		font-weight: inherit;
	}
	li {
		list-style-type: none;
	}
	:global(svg text) {
		font-family: Helvetica, Arial, sans-serif;
		fill: red;
	}
	:global(svg g[data-mml-node="merror"] rect) {
		fill: white;
	}
</style>
