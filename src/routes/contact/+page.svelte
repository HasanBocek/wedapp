<script>
  let formData = {
    title: '',
    content: ''
  };
  
  let isSubmitting = false;
  let errorMessage = '';
  
  function handleSubmit() {
    isSubmitting = true;
    
    try {
      const mailtoLink = `mailto:mail@hasanbocek.com?subject=${encodeURIComponent(formData.title)}&body=${encodeURIComponent(formData.content)}`;
      window.location.href = mailtoLink;
      
      // Reset form
      formData = {
        title: '',
        content: ''
      };
    } catch (error) {
      errorMessage = 'Bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
    } finally {
      isSubmitting = false;
    }
  }
</script>

<svelte:head>
  <title>İletişim | Hasan BÖCEK</title>
  <meta name="description" content="Hasan BÖCEK ile iletişime geçin">
  <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</svelte:head>

<div class="py-12">
  <h1 class="text-4xl font-bold text-center mb-16 text-gray-800">İletişime Geçin</h1>
  
  <div class="max-w-6xl mx-auto px-4">
    <div class="flex flex-col md:flex-row gap-10">
      <!-- Contact Information -->
      <div class="md:w-1/3">
        <div class="bg-white rounded-lg shadow-lg p-8 sticky top-24">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">İletişim Bilgileri</h2>
          
          <div class="space-y-6">
            <div class="flex items-start">
              <div class="bg-teal-100 p-3 rounded-full mr-4">
                <i class="bx bx-envelope text-teal-700 text-lg"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-700">Email</h3>
                <a href="mailto:mail@hasanbocek.com" class="text-gray-600 hover:underline">mail@hasanbocek.com</a>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-teal-100 p-3 rounded-full mr-4">
                <i class="bx bx-share-alt text-teal-700 text-lg"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-700">Sosyal Medya</h3>
                <div class="flex space-x-4 mt-2">
                  <a href="https://github.com/HasanBocek" target="_blank" rel="noopener noreferrer" class="text-gray-700 hover:text-teal-600">
                    <i class="bx bxl-github text-xl"></i>
                  </a>
                  <a href="https://www.linkedin.com/in/hasanbocek" target="_blank" rel="noopener noreferrer" class="text-gray-700 hover:text-teal-600">
                    <i class="bx bxl-linkedin text-xl"></i>
                  </a>
                  <a href="https://instagram.com/hasanbocekk" target="_blank" rel="noopener noreferrer" class="text-gray-700 hover:text-teal-600">
                    <i class="bx bxl-instagram text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
            
            <div class="flex items-start">
              <div class="bg-teal-100 p-3 rounded-full mr-4">
                <i class="bx bx-map text-teal-700 text-lg"></i>
              </div>
              <div>
                <h3 class="font-semibold text-gray-700">Konum</h3>
                <p class="text-gray-600">Trabzon, Türkiye</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Contact Form -->
      <div class="md:w-2/3">
        <div class="bg-white rounded-lg shadow-lg p-8">
          <h2 class="text-2xl font-bold mb-6 text-gray-800">Mail Gönderin</h2>
          
          <form on:submit|preventDefault={handleSubmit} class="space-y-6">
            <div>
              <label for="title" class="block text-sm font-medium text-gray-700 mb-1">Başlık</label>
              <input
                type="text"
                id="title"
                bind:value={formData.title}
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="Mail başlığı"
              />
            </div>
            
            <div>
              <label for="content" class="block text-sm font-medium text-gray-700 mb-1">İçerik</label>
              <textarea
                id="content"
                bind:value={formData.content}
                required
                rows="6"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 min-h-[150px] max-h-[400px]"
                placeholder="Mail içeriği..."
              ></textarea>
            </div>
            
            {#if errorMessage}
              <div class="bg-red-100 text-red-700 p-4 rounded-lg">
                {errorMessage}
              </div>
            {/if}
            
            <button
              type="submit"
              disabled={isSubmitting}
              class="w-full py-3 px-6 bg-teal-600 text-white font-medium rounded-lg hover:bg-teal-700 transition duration-300 flex items-center justify-center"
            >
              {#if isSubmitting}
                <i class="bx bx-loader-alt bx-spin mr-2"></i>
                Gönderiliyor...
              {:else}
                Mail Gönder
              {/if}
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</div> 