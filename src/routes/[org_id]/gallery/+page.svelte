<script>
	import Header from '../components/Header.svelte';
	import Footer from '../components/Footer.svelte';

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
</script>

<Header {Actors} />

<!-- Genel arka plan pembe ve serif font -->
<div class="min-h-screen bg-pink-50 p-4">
	<p class="pt-7 pb-10 text-lg lg:mr-60 lg:ml-60">{description}</p>

	<div
		class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:mr-60 lg:ml-60 lg:grid-cols-4"
	>
		{#each posts as post}
			<div
				class="bg-opacity-80 transform cursor-pointer overflow-hidden bg-white shadow-lg"
				on:click={() => openModal(post)}
			>
				{#if post.photos && post.photos.length > 0}
					<div class="relative">
						<img src={post.photos[0]} alt="Gallery Preview" class="object-cover" />
						{#if post.photos.length > 1}
							<div
								class="bg-opacity-60 absolute inset-0 flex items-center justify-center bg-black/50"
							>
								<span class="text-2xl font-semibold text-white">+{post.photos.length - 1}</span>
							</div>
						{/if}
					</div>
				{/if}

				<!-- Gönderen, tarih ve mesaj -->
				<div class="p-4">
					{#if post.message}
						<div class="mb-2 text-pink-800 italic">
							“{post.message}”
						</div>
					{/if}
					<div class="mt-2 text-sm text-pink-700">
						{post.sender} • {post.date}
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

{#if showModal}
	<div
		class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
		on:click={closeModal}
	>
		<div
			class="relative mr-2 ml-2 max-h-[90vh] w-full max-w-3xl overflow-auto bg-white shadow-xl"
			on:click|stopPropagation
		>
			<div class="sticky top-0 z-10 flex justify-end border-b bg-white p-4">
				<button class="text-2xl text-pink-500 hover:text-pink-700" on:click={closeModal}>
					✕
				</button>
			</div>

			<!-- Kaydırılabilir fotoğraf alanı -->
			{#if selectedPost.photos && selectedPost.photos.length > 0}
				<div class="flex-grow overflow-auto p-4">
					<div class="grid grid-cols-1 gap-3 sm:grid-cols-2">
						{#each selectedPost.photos as photo}
							<img
								src={photo}
								alt="Photo"
								class="h-64 w-full cursor-pointer object-cover"
								on:click={toggleFullscreen}
							/>
						{/each}
					</div>
				</div>
			{/if}

			<div class="sticky bottom-0 border-t bg-white p-4">
				{#if selectedPost.message}
					<div class="mb-2 text-pink-800 italic">“{selectedPost.message}”</div>
				{/if}
				<div class="text-m text-pink-700">
					{selectedPost.sender} • {selectedPost.date}
				</div>
			</div>
		</div>
	</div>
{/if}

<Footer {Actors} />
