<script>
	export let Actors = '';
</script>

<footer class="bg-gray-900 py-8 text-white">
	<div class="container mx-auto px-4">
		<div class="flex flex-col items-center justify-between md:flex-row">
			<div class="mb-4 md:mb-0">
				<h3 class="mb-2 text-xl font-bold">{Actors}</h3>
			</div>
		</div>

		<div class="mt-8 border-t border-gray-800 pt-6 text-center text-gray-400">
			<p>&copy; {new Date().getFullYear()} Vision Of Me. Tüm hakları saklıdır.</p>
		</div>
	</div>
</footer>
