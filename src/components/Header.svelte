<script>
  let isMenuOpen = false;
  
  function toggleMenu() {
    isMenuOpen = !isMenuOpen;
  }
</script>

<header class="bg-gradient-to-r from-teal-400 to-emerald-500 text-white shadow-lg">
  <div class="container mx-auto px-4 py-4">
    <nav class="flex items-center justify-between">
      <div class="text-xl font-bold">
        <a href="/" class="flex items-center space-x-2">
          <span>Hasan BÖCEK</span>
        </a>
      </div>
      
      <!-- Mobile menu button -->
      <button 
        class="md:hidden p-2 rounded focus:outline-none" 
        on:click={toggleMenu}
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {#if isMenuOpen}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          {:else}
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          {/if}
        </svg>
      </button>
      
      <!-- Desktop navigation -->
      <div class="hidden md:flex space-x-8">
        <a href="/">Ana Sayfa</a>
        <a href="/about">Hakkımda</a>
        <a href="/projects">Projeler</a>
        <a href="/education">Eğitim</a>
        <a href="/contact">İletişim</a>
      </div>
    </nav>
    
    <!-- Mobile menu -->
    {#if isMenuOpen}
      <div class="md:hidden mt-4 flex flex-col space-y-4 pb-4">
        <a href="/">Ana Sayfa</a>
        <a href="/about">Hakkımda</a>
        <a href="/projects">Projeler</a>
        <a href="/education">Eğitim</a>
        <a href="/contact">İletişim</a>
      </div>
    {/if}
  </div>
</header> 