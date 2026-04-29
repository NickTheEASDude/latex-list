export async function loadMathJax(packages = ['base', 'ams', 'physics']) {
	if (window.MathJax?.tex2svg) return; // already loaded

	window.MathJax = {
		loader: {
			load: packages.filter(p => p !== 'base').map(p => `[tex]/${p}`)
		},
		tex: { packages: { '[+]': packages } },
		output: { font: 'mathjax-modern' },
	};

	await new Promise((resolve) => {
		const script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/mathjax@4/tex-svg.js';
		script.async = true;
		script.onload = () => {
			const interval = setInterval(() => {
				if (window.MathJax?.tex2svgPromise) {
					clearInterval(interval);
					resolve();
				}
			}, 50);
		};
		document.head.appendChild(script);
	});
}
