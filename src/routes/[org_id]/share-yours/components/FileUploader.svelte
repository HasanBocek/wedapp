<script>
	import { flip } from 'svelte/animate';

	export let files = [];
	export let previews = [];
	export let expanded = false;
	export let MAX_ITEMS = 50;
	export let ITEM_WIDTH = 144;
	export let containerRef;
	export let collapsedCount = 1;
	export let collapsedPositions = [];
	export let collapsedRotations = [];

	export let onFilesChange = () => {};
	export let onDrop = () => {};
	export let onDragOver = () => {};
	export let onToggleExpanded = () => {};
	export let onRemovePreview = () => {};

	function handleFiles(event) {
		const newFiles = Array.from(event.target.files).filter((f) => /^image\/|^video\//.test(f.type));
		onFilesChange(newFiles);
	}

	function handleDrop(event) {
		event.preventDefault();
		const newFiles = Array.from(event.dataTransfer.files).filter((f) =>
			/^image\/|^video\//.test(f.type)
		);
		onDrop(newFiles);
	}

	function handleDragOver(event) {
		event.preventDefault();
		onDragOver();
	}
</script>

<div class="flex w-full items-center justify-center">
	<label
		for="dropzone-file"
		class="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-pink-300 bg-pink-50 transition hover:bg-pink-100 sm:h-80 md:h-96"
		on:drop={handleDrop}
		on:dragover={handleDragOver}
	>
		<input
			id="dropzone-file"
			type="file"
			accept="image/*,video/*"
			multiple
			class="hidden"
			on:change={handleFiles}
		/>
		<div class="flex flex-col items-center justify-center pt-5 pb-6">
			<svg
				class="mb-4 h-12 w-12 text-pink-400"
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 20 16"
			>
				<path
					stroke="currentColor"
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2"
				/>
			</svg>
			<p class="m-3 mb-2 text-center text-lg font-semibold text-pink-500">
				Resim veya Video Yüklemek için Tıkla
			</p>
			<p class="text-sm text-gray-500">Tek seferde en fazla {MAX_ITEMS} adet</p>
		</div>
	</label>
</div>

{#if previews.length}
	{#if !expanded}
		<!-- Collapsed dynamic view -->
		<div
			bind:this={containerRef}
			class="stacked relative mt-8 h-32 cursor-pointer"
			on:click={onToggleExpanded}
		>
			{#each previews.slice(0, collapsedCount) as p, i (p.src)}
				<img
					animate:flip={{ duration: 150 }}
					src={p.src}
					alt={p.name}
					class="absolute h-36 w-36 rounded-lg object-cover shadow-lg"
					style="left: {collapsedPositions[
						i
					]}; transform: translateX(-50%) rotate({collapsedRotations[i]}deg); z-index: {100 - i};"
				/>
			{/each}
			<div
				class="absolute top-2 right-2 z-100 flex h-8 w-8 items-center justify-center rounded-full bg-pink-600 font-semibold text-white shadow-lg"
			>
				{previews.length}
			</div>
		</div>
	{:else}
		<!-- Expanded view with remove controls -->
		<div class="relative">
			<button
				on:click={onToggleExpanded}
				class="top-2 right-2 rounded-full bg-pink-500 px-3 py-1 text-xs text-white shadow transition hover:bg-pink-600"
				>Listeyi Küçült</button
			>
			<div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each previews as p, i (p.src)}
					<div animate:flip={{ duration: 100 }} class="relative">
						<button
							on:click={() => onRemovePreview(i)}
							class="bg-opacity-80 hover:bg-opacity-100 absolute top-1 right-1 rounded-full bg-white p-1 shadow transition"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4 text-pink-600"
								fill="none"
								viewBox="0 0 24 24"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							</svg>
						</button>
						<img src={p.src} alt={p.name} class="h-32 w-full rounded-lg object-cover shadow-md" />
					</div>
				{/each}
			</div>
		</div>
	{/if}
{:else}
	<p class="text-center text-gray-600">Henüz medya seçilmedi.</p>
{/if}

<style>
	.stacked img {
		transition: transform 0.2s ease;
	}
	.stacked:hover img {
		transform: translateY(-5px);
	}
</style>
