<script>
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import FileUploader from './components/FileUploader.svelte';
	import FormInputs from './components/FormInputs.svelte';
	import Title from './components/Title.svelte';
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

	let files = [];
	let previews = [];
	let expanded = false;
	let text = 'Çektiğiniz Kareleri Bizimle Paylaşın';
	let authorName = '';
	let messageText = '';
	export let Actors = 'John Doe & Maria';

	let containerRef;
	let collapsedCount = 1;

	const MAX_ITEMS = 50;
	const ITEM_WIDTH = 144; // px, matches h-36 w-36

	$: slug = $page.params.org_id;

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

<div class="relative min-h-screen" style="background: linear-gradient(135deg, var(--color-cream) 0%, white 100%);">
	<div class="container mx-auto max-w-4xl px-2 py-4 sm:px-4 sm:py-8">
		<Header {Actors} />
		
		<div class="my-6 sm:my-12 rounded-lg bg-white p-4 sm:p-8 shadow-md" style="border: 1px solid var(--color-sage);">
			<Title {text} />

			<FormInputs
				bind:authorName
				bind:messageText
				onAuthorNameChange={() => {}}
				onMessageTextChange={() => {}}
			/>

			<div class="my-6 sm:my-8">
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
			</div>

			<button
				class="mt-6 sm:mt-8 w-full cursor-pointer rounded-lg px-5 py-3 text-center text-lg font-medium text-white shadow-md transition-all hover:shadow-lg focus:outline-none disabled:opacity-50"
				style="background-color: var(--color-emerald); font-family: var(--font-sans);"
				disabled={!canSend}
			>
				Gönder
			</button>
		</div>
	</div>
	<Footer {Actors} />

	<!-- Floating button to open gallery -->
	<a
		href={`/${slug}/gallery`}
		class="fixed bottom-4 right-4 z-50 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-lg transition"
		aria-label="Galeriyi Aç"
	>
		Galeri
	</a>
</div>

<style>
	:global(body) {
		color: var(--color-navy);
		font-family: var(--font-sans);
	}
</style>
