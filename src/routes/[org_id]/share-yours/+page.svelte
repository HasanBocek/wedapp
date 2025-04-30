<script>
	import { onMount } from 'svelte';
	import FileUploader from './components/FileUploader.svelte';
	import FormInputs from './components/FormInputs.svelte';
	import Header from './components/Header.svelte';

	let files = [];
	let previews = [];
	let expanded = false;
	let text = 'Çektiğiniz Kareleri Bizimle Paylaşın';
	let authorName = '';
	let messageText = '';

	let containerRef;
	let collapsedCount = 1;

	const MAX_ITEMS = 50;
	const ITEM_WIDTH = 144; // px, matches h-36 w-36

	// Handle new file selection without duplicates
	function handleFilesChange(newFiles) {
		newFiles.forEach((f) => {
			if (!files.some((e) => e.name === f.name && e.size === f.size)) {
				files.push(f);
			}
		});
		if (files.length > MAX_ITEMS) files = files.slice(0, MAX_ITEMS);
		generatePreviews();
	}

	function handleDrop(newFiles) {
		newFiles.forEach((f) => {
			if (!files.some((e) => e.name === f.name && e.size === f.size)) {
				files.push(f);
			}
		});
		if (files.length > MAX_ITEMS) files = files.slice(0, MAX_ITEMS);
		generatePreviews();
	}

	function handleDragOver() {
		// No additional handling needed
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

	$: canSend = authorName.trim().length > 0 && (messageText.trim().length > 0 || files.length > 0);

	// async function upload() {
	// 	if (!files.length) return;
	// 	const formData = new FormData();
	// 	files.forEach((file) => formData.append('photos', file));
	// 	try {
	// 		const res = await fetch('/api/upload', { method: 'POST', body: formData });
	// 		if (res.ok) {
	// 			alert('Fotoğraflar başarıyla yüklendi!');
	// 			files = [];
	// 			previews = [];
	// 			expanded = false;
	// 		} else {
	// 			alert('Yükleme sırasında hata oluştu.');
	// 		}
	// 	} catch (err) {
	// 		console.error(err);
	// 		alert('Sunucuya bağlanılamadı.');
	// 	}
	// }
</script>

<div
	class="relative flex min-h-screen items-center justify-center bg-white bg-[radial-gradient(70%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)] p-4"
>
	<div class="mb-8 w-full max-w-4xl space-y-6">
		<Header {text} />

		<FormInputs
			bind:authorName
			bind:messageText
			onAuthorNameChange={() => {}}
			onMessageTextChange={() => {}}
		/>

		<FileUploader
			bind:files
			bind:previews
			bind:expanded
			bind:containerRef
			bind:collapsedCount
			bind:collapsedPositions
			bind:collapsedRotations
			{MAX_ITEMS}
			{ITEM_WIDTH}
			onFilesChange={handleFilesChange}
			onDrop={handleDrop}
			onDragOver={handleDragOver}
			onToggleExpanded={toggleExpanded}
			onRemovePreview={removePreview}
		/>

		<button
			class="w-full mt-8 cursor-pointer rounded-lg bg-pink-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-50"
			disabled={!canSend}
			on:click={upload}
		>
			Gönder
		</button>
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
