<script>
	let isMenuOpen = false;
	export let Actors = '';

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
</script>

<header
	class="mt-3 rounded-xl bg-cover bg-center text-white shadow-lg py-16"
	style="background-image: url('https://www.brides.com/thmb/bERlutAxPimQWsKsDaCf6Khfd2s=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/katrina-and-samson-wedding-25-61a50cfe2e4844a68253b5a6303cac91.jpg');"
>
	<div class="container mx-auto max-h-7">
		<div class="text-xl font-bold">
			<p class="text-center text-3xl text-shadow-lg">{Actors}</p>
		</div>
	</div>
</header>
