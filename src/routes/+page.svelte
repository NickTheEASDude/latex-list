<svelte:head>
	<title>Latex List</title>
</svelte:head>

<script>
	import TexSVG from '$lib/components/TexSVG.svelte';
	let equations = $state([]);
	let equationText = $state('');
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
		if (event.key === 'Enter' && !event.shiftKey) {
			event.preventDefault();
			event.currentTarget.form?.requestSubmit();
		}
	}
</script>
<main>
	<ul>
		{#each equations as equation}
			<li><TexSVG latex={equation} display={true} /></li>
		{/each}
	</ul>
	<form onsubmit={addEquation}>
		<textarea onkeydown={checkKey} bind:value={equationText} placeholder="Put LaTeX here"></textarea>
		<p><TexSVG latex={equationText} display={true} renderPreview={true} /></p>
		<br />
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
</style>
