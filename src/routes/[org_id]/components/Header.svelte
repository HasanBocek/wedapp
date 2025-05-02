<script>
	let isMenuOpen = false;
	export let Actors = '';

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header class="bg-gradient-to-r from-teal-400 to-emerald-500 p-15 text-white shadow-lg">
	<div class="container mx-auto px-4 py-4">
		<div class="text-xl font-bold">
			<a class="text-center text-5xl">{Actors}</a>
		</div>
	</div>
</header>
