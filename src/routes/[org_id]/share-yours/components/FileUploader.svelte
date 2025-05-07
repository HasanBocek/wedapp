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

	$: if (containerRef) {
		const width = containerRef.clientWidth;
		const fit = Math.floor(width / ITEM_WIDTH);
		collapsedCount = Math.max(1, Math.min(previews.length, fit));
	}

	function getPositions(count) {
		if (count === 1) return ['50%'];
		const step = 100 / (count + 1);
		return Array.from({ length: count }, (_, i) => `${(i + 1) * step}%`);
	}

	function getRotations(count) {
		if (count === 1) return [0];
		const maxAngle = 15;
		const step = count > 1 ? (2 * maxAngle) / (count - 1) : 0;
		return Array.from({ length: count }, (_, i) => (i - (count - 1) / 2) * step);
	}

	$: collapsedPositions = getPositions(collapsedCount);
	$: collapsedRotations = getRotations(collapsedCount);
</script>

<div class="flex w-full items-center justify-center">
	<label
		for="dropzone-file"
		class="flex h-48 sm:h-64 md:h-80 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed transition hover:bg-opacity-70"
		style="border-color: var(--color-sage); background-color: var(--color-cream); background-image: url('data:image/svg+xml,%3Csvg width='20' height='20' viewBox='0 0 20 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23D1D9CE' fill-opacity='0.4' fill-rule='evenodd'%3E%3Ccircle cx='3' cy='3' r='3'/%3E%3Ccircle cx='13' cy='13' r='3'/%3E%3C/g%3E%3C/svg%3E');"
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
		<div class="flex flex-col items-center justify-center px-3 py-4">
			<svg 
				class="mb-3 sm:mb-4 h-12 w-12 sm:h-14 sm:w-14" 
				style="color: var(--color-navy);"
				xmlns="http://www.w3.org/2000/svg" 
				fill="none" 
				viewBox="0 0 24 24" 
				stroke="currentColor"
			>
				<path 
					stroke-linecap="round" 
					stroke-linejoin="round" 
					stroke-width="1.5" 
					d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" 
				/>
			</svg>
			<p class="mb-2 text-center text-base sm:text-lg font-serif" style="color: var(--color-navy); font-family: var(--font-serif);">
				Resim veya Video Yüklemek için Tıkla
			</p>
			<p class="text-xs sm:text-sm" style="color: var(--color-navy); opacity: 0.75; font-family: var(--font-sans);">
				Tek seferde en fazla {MAX_ITEMS} adet
			</p>
		</div>
	</label>
</div>

{#if previews.length}
	{#if !expanded}
		<div
			bind:this={containerRef}
			class="stacked relative mt-6 sm:mt-8 h-32 cursor-pointer"
			on:click={onToggleExpanded}
		>
			{#each previews.slice(0, collapsedCount) as p, i (p.src)}
				<img
					animate:flip={{ duration: 150 }}
					src={p.src}
					alt={p.name}
					class="absolute h-36 w-36 rounded-lg object-cover shadow-lg"
					style="left: {collapsedPositions[i]}; transform: translateX(-50%) rotate({collapsedRotations[i]}deg); z-index: {100 - i}; border: 2px solid white;"
				/>
			{/each}
			<div
				class="absolute top-2 right-2 z-100 flex h-8 w-8 items-center justify-center rounded-full font-semibold text-white shadow-lg"
				style="background-color: var(--color-mauve);"
			>
				{previews.length}
			</div>
		</div>
	{:else}
		<!-- Expanded view with remove controls -->
		<div class="relative mt-4">
			<button
				on:click={onToggleExpanded}
				class="rounded-md px-3 py-2 sm:px-4 sm:py-2 text-sm font-medium text-white shadow transition hover:shadow-lg"
				style="background-color: var(--color-navy);"
			>
				Listeyi Küçült
			</button>
			<div class="mt-4 grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each previews as p, i (p.src)}
					<div animate:flip={{ duration: 100 }} class="relative">
						<button
							on:click={() => onRemovePreview(i)}
							class="absolute top-2 right-2 rounded-full bg-white p-1.5 shadow transition hover:bg-gray-100"
							style="color: var(--color-emerald);"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								class="h-4 w-4"
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
	<p class="my-3 sm:my-4 text-center" style="color: var(--color-navy); opacity: 0.6;">Henüz medya seçilmedi.</p>
{/if}

<style>
	.stacked img {
		transition: all 0.3s ease;
	}
	.stacked:hover img {
		transform: translateY(-8px) translateX(-50%);
		box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
	}
</style>
