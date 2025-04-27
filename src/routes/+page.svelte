<script>
	import { onMount } from 'svelte';
	import { flip } from 'svelte/animate';
	let files = [];
	let previews = [];
	let expanded = false;
	let title = 'John & Doe';
	let text = 'Çektiğiniz Kareleri Bizimle Paylaşın';

	let containerRef;
	let collapsedCount = 1;

	const MAX_ITEMS = 50;
	const ITEM_WIDTH = 144; // px, matches h-36 w-36

	let authorName = '';
	let messageText = '';

	// Handle new file selection without duplicates
	function handleFiles(event) {
		const newFiles = Array.from(event.target.files);
		newFiles.forEach((f) => {
			if (!files.some((e) => e.name === f.name && e.size === f.size)) {
				files.push(f);
			}
		});
		if (files.length > MAX_ITEMS) files = files.slice(0, MAX_ITEMS);
		generatePreviews();
	}

	function handleDrop(event) {
		event.preventDefault();
		const newFiles = Array.from(event.dataTransfer.files);
		newFiles.forEach((f) => {
			if (!files.some((e) => e.name === f.name && e.size === f.size)) {
				files.push(f);
			}
		});
		if (files.length > MAX_ITEMS) files = files.slice(0, MAX_ITEMS);
		generatePreviews();
	}

	function handleDragOver(event) {
		event.preventDefault();
	}

	function generatePreviews() {
		previews = [];
		files.forEach((file) => {
			const reader = new FileReader();
			reader.onload = (e) => {
				previews = [...previews, { name: file.name, src: e.target.result }];
			};
			reader.readAsDataURL(file);
		});
		expanded = false;
	}

	function toggleExpanded() {
		expanded = !expanded;
	}

	function removePreview(idx) {
		files = files.filter((_, i) => i !== idx);
		previews = previews.filter((_, i) => i !== idx);
	}

	// Dynamically compute how many items fit in collapsed view
	$: if (containerRef) {
		const width = containerRef.clientWidth;
		const fit = Math.floor(width / ITEM_WIDTH);
		collapsedCount = Math.max(1, Math.min(previews.length, fit)) + 1;
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

	$: canSend = authorName.trim().length > 0 && (messageText.trim().length > 0 || files.length > 0);

	async function upload() {
		if (!files.length) return;
		const formData = new FormData();
		files.forEach((file) => formData.append('photos', file));
		try {
			const res = await fetch('/api/upload', { method: 'POST', body: formData });
			if (res.ok) {
				alert('Fotoğraflar başarıyla yüklendi!');
				files = [];
				previews = [];
				expanded = false;
			} else {
				alert('Yükleme sırasında hata oluştu.');
			}
		} catch (err) {
			console.error(err);
			alert('Sunucuya bağlanılamadı.');
		}
	}
</script>

<div
	class="relative flex min-h-screen items-center justify-center bg-white bg-[radial-gradient(70%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] p-4"
>
	<div class="w-full max-w-4xl space-y-6">
		<h1 class="text-center text-3xl font-bold text-pink-600">
			{text}
		</h1>

		<label for="author" class="mb-2 block text-sm font-medium text-gray-900"> İsim Soyisim </label>
		<input
			type="text"
			id="author"
			bind:value={authorName}
			class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500
		focus:ring-pink-500"
			placeholder="John & Doe"
		/>

		<label for="message" class="mb-2 block text-sm font-medium text-gray-900"> Mesajınız </label>
		<textarea
			id="message"
			bind:value={messageText}
			rows="4"
			class="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5
			text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
			placeholder="Düşüncelerinizi paylaşın..."
			maxlength="500"
		></textarea>

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
					accept="image/*"
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
					class="stacked relative h-32 cursor-pointer"
					on:click={toggleExpanded}
				>
					{#each previews.slice(0, collapsedCount) as p, i (p.src)}
						<img
							animate:flip
							src={p.src}
							alt={p.name}
							class="absolute h-36 w-36 rounded-lg object-cover shadow-lg"
							style="left: {collapsedPositions[
								i
							]}; transform: translateX(-50%) rotate({collapsedRotations[i]}deg); z-index: {100 -
								i};"
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
						on:click={toggleExpanded}
						class="top-2 right-2 rounded-full bg-pink-500 px-3 py-1 text-xs text-white shadow transition hover:bg-pink-600"
						>Listeyi Küçült</button
					>
					<div class="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
						{#each previews as p, i (p.src)}
							<div animate:flip={{ duration: 150 }} class="relative">
								<button
									on:click={() => removePreview(i)}
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
								<img
									src={p.src}
									alt={p.name}
									class="h-32 w-full rounded-lg object-cover shadow-md"
								/>
							</div>
						{/each}
					</div>
				</div>
			{/if}
		{:else}
			<p class="text-center text-gray-600">Henüz medya seçilmedi.</p>
		{/if}

		{#if canSend}
			<button
				on:click={upload}
				class="mt-4 w-full cursor-pointer rounded-full bg-pink-500 py-3 font-semibold text-white shadow-lg transition hover:bg-pink-600"
				>Gönder</button
			>
		{/if}
	</div>
</div>

<style>
	.stacked img {
		transition: transform 0.2s ease;
	}
	.stacked:hover img {
		transform: translateY(-5px);
	}
</style>
