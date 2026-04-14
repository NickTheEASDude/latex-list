<script>
	import MathSVG from 'svelte-tex/package/MathSVG.svelte';
	let equations = $state([]);
	let equationText = $state(String.raw``);
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
</script>
<main>
	<ul>
		{#each equations as equation}
			<li><MathSVG tex={equation} /></li>
		{/each}
	</ul>
	<form onsubmit={addEquation}>
		<input placeholder="Put LaTeX here" bind:value={equationText} />
		<br />
		<p><MathSVG tex={equationText || String.raw`\text{LaTeX Preview Output}`} /></p>
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
</style>
