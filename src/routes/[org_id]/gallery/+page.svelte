<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';
	import GalleryCard from './components/GalleryCard.svelte';
	import GalleryModal from './components/GalleryModal.svelte';
	import { page } from '$app/stores';

	// Güncel ve çalışan mock veriler
	export let posts = [
		{
			id: 1,
			photos: [
				'https://picsum.photos/seed/wedding1/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding3/600/400'
			],
			sender: 'Elif & Murat',
			date: '2025-06-12',
			message: 'Hayatımızın en özel gününü paylaşıyoruz.'
		},
		{
			id: 2,
			photos: [],
			sender: 'Aslı & Can',
			date: '2025-05-30',
			message: 'Unutulmaz anlar yakaladık.'
		},
		{
			id: 3,
			photos: [
				'https://picsum.photos/seed/wedding1/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding3/600/400'
			],
			sender: 'Elif & Murat',
			date: '2025-06-12',
			message: 'Hayatımızın en özel gününü paylaşıyoruz.'
		},
		{
			id: 4,
			photos: [
				'https://picsum.photos/seed/wedding4/600/400',
				'https://picsum.photos/seed/wedding5/600/400'
			],
			sender: 'Aslı & Can',
			date: '2025-05-30',
			message: 'Unutulmaz anlar yakaladık.'
		},
		{
			id: 5,
			photos: [
				'https://picsum.photos/seed/wedding1/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding2/600/400',
				'https://picsum.photos/seed/wedding3/600/400'
			],
			sender: 'Elif & Murat',
			date: '2025-06-12',
			message: 'Hayatımızın en özel gününü paylaşıyoruz.'
		},
		{
			id: 6,
			photos: [
				'https://picsum.photos/seed/wedding4/600/400',
				'https://picsum.photos/seed/wedding5/600/400'
			],
			sender: 'Aslı & Can',
			date: '2025-05-30',
			message: 'Unutulmaz anlar yakaladık.'
		}
	];

	let selectedPost = null;
	let showModal = false;
	let Actors = 'John Doe & Maria';
	let description = 'Diğer Paylaşılan Fotoğraflar:';

	function openModal(post) {
		selectedPost = post;
		showModal = true;
	}

	function closeModal() {
		showModal = false;
		selectedPost = null;
		if (document.fullscreenElement) {
			document.exitFullscreen();
		}
	}

	function toggleFullscreen(event) {
		const el = event.currentTarget;
		if (document.fullscreenElement) {
			document.exitFullscreen();
		} else {
			if (el.requestFullscreen) {
				el.requestFullscreen();
			} else if (el.webkitRequestFullscreen) {
				el.webkitRequestFullscreen();
			} else if (el.msRequestFullscreen) {
				el.msRequestFullscreen();
			}
		}
		// Click propagation modal kapatmasın
		event.stopPropagation();
	}

	$: slug = $page.params.org_id;
</script>



<!-- Elegant background with custom fonts -->
<div class="min-h-screen" style="background: linear-gradient(to bottom, var(--color-cream), white);">
	<div class="container mx-auto px-2 py-4">
		<Header {Actors} />
		<h2 class="mb-8 mt-8 text-center font-serif text-3xl text-navy" style="font-family: var(--font-serif); color: var(--color-navy);">
			{description}
		</h2>

		<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
			{#each posts as post}
				<GalleryCard {post} {openModal} />
			{/each}
		</div>
	</div>
</div>

<GalleryModal {selectedPost} {showModal} closeModal={closeModal} toggleFullscreen={toggleFullscreen} />

<Footer {Actors} />

<!-- Floating button to open share-yours form -->
<a
  href={`/${slug}/share-yours`}
  class="fixed bottom-4 right-4 z-50 flex items-center justify-center bg-emerald-500 hover:bg-emerald-600 text-white rounded-full p-4 shadow-lg transition"
  aria-label="Paylaşımı Aç"
>
  Paylaş
</a>

<style>
	.scale-102 {
		transform: scale(1.02);
	}
</style>
