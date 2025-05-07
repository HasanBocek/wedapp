<script>
  export let post;
  export let openModal;
</script>

<div
  class="overflow-hidden rounded-md bg-white shadow-md transition-transform duration-300 hover:shadow-lg hover:scale-102"
  style="border: 1px solid var(--color-sage);"
  on:click={() => openModal(post)}
>
  {#if post.photos && post.photos.length > 0}
    <div class="relative overflow-hidden" style="height: 220px;">
      <img
        src={post.photos[0]}
        alt="Gallery Preview"
        class="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
      />
      {#if post.photos.length > 1}
        <div class="absolute bottom-2 right-2 rounded-full bg-black/60 px-3 py-1 text-sm text-white">
          +{post.photos.length - 1}
        </div>
      {/if}
    </div>
  {/if}

  <div class="p-4">
    {#if post.message}
      <div
        class="mb-2 font-serif italic"
        style="color: var(--color-navy); font-family: var(--font-serif);"
      >
        "{post.message}"
      </div>
    {/if}
    <div
      class="mt-2 text-sm font-sans"
      style="color: var(--color-emerald); font-family: var(--font-sans);"
    >
      {post.sender} • {post.date}
    </div>
  </div>
</div> 