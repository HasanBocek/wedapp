<script>
  export let selectedPost = null;
  export let showModal = false;
  export let closeModal;
  export let toggleFullscreen;
</script>

{#if showModal}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
    on:click={closeModal}
  >
    <div
      class="relative mx-auto my-auto max-h-[90vh] w-full max-w-4xl overflow-auto rounded-lg bg-white shadow-2xl"
      style="border: 2px solid var(--color-sage);"
      on:click|stopPropagation
    >
      <div
        class="sticky top-0 z-10 flex justify-end border-b p-4"
        style="background-color: var(--color-cream);"
      >
        <button
          class="rounded-full p-2 transition-colors"
          style="color: var(--color-navy); background-color: var(--color-sage);"
          on:click={closeModal}
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {#if selectedPost.photos && selectedPost.photos.length > 0}
        <div class="flex-grow overflow-auto p-6">
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {#each selectedPost.photos as photo}
              <div class="overflow-hidden rounded-lg shadow-md">
                <img
                  src={photo}
                  alt="Photo"
                  class="h-64 w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
                  on:click={toggleFullscreen}
                />
              </div>
            {/each}
          </div>
        </div>
      {/if}

      <div
        class="sticky bottom-0 border-t p-5"
        style="background-color: var(--color-cream);"
      >
        {#if selectedPost.message}
          <div
            class="mb-3 font-serif text-lg italic"
            style="color: var(--color-navy); font-family: var(--font-serif);"
          >
            "{selectedPost.message}"
          </div>
        {/if}
        <div
          class="text-m font-medium"
          style="color: var(--color-emerald); font-family: var(--font-sans);"
        >
          {selectedPost.sender} • {selectedPost.date}
        </div>
      </div>
    </div>
  </div>
{/if} 