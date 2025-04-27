<script>
  import { onMount } from 'svelte';
  
  let isVisible = false;
  
  onMount(() => {
    isVisible = true;
  });
  
  const projects = [
    {
      title: "CEC - Student Society Management System",
      description: "Etkinlik yönetimi, haber ve duyuru paylaşımı, anket oluşturma, üye kayıt ve takibi gibi süreçleri kapsayan; kulüp içi organizasyonu ve iletişimi dijitalleştirmeyi amaçlayan kapsamlı bir kulüp yönetim çözümüdür. Projenin liderliğini üstleniyor ve geliştirme sürecini aktif olarak yönetiyorum.",
      technologies: ["Node.JS", "Express", "Python", "Django", "MongoDB", "JWT"],
      image: "https://placehold.co/600x400/e2e8f0/00BBA7?text=Student+Society+Management+System",
    },
    {
      title: "ToonApp - IOS Cartoonize Application",
      description: "Kullanıcıların fotoğraflarını yapay zekâ destekli filtrelerle çizgi film tarzına dönüştürmesini sağlayan bir iOS uygulamasıdır. Backend altyapısı, Supabase ve Deno kullanılarak tamamen serverless mimaride geliştirilmektedir. Bu yapı sayesinde yüksek performans, ölçeklenebilirlik ve düşük bakım maliyeti hedeflenmiştir.",
      technologies: ["Supabase", "Deno.JS"],
      image: "https://placehold.co/600x400/e2e8f0/00BBA7?text=Toon+App",
    },
    {
      title: "FR - Food Recipe Backend",
      description: "Yemek tarifi paylaşım uygulaması için API. Kullanıcıların tarif ekleyebildiği, arayabildiği, değerlendirebildiği ve paylaşabildiği bir platformun backend altyapısı.",
      technologies: ["Node.JS", "Express", "MongoDB", "JWT", "RESTful API"],
      image: "https://placehold.co/600x400/e2e8f0/00BBA7?text=Food+Recipe+API",
      github: "https://github.com/HasanBocek/Food-Recipe-Backend",
    },
    {
      title: "HPMS - Hotel Property Management System",
      description: "Otel yönetim sistemi. Rezervasyon yönetimi, oda dağılımı, müşteri kayıtları, faturalandırma ve personel operasyonlarını içeren kapsamlı bir otel işletme çözümü.",
      technologies: ["Node.JS", "Express", "MongoDB", "JWT", "RESTful API"],
      image: "https://placehold.co/600x400/e2e8f0/00BBA7?text=Hotel+Management+System",
      github: "https://github.com/HasanBocek/Hotel-Property-Management-System",
    },
    {
      title: "SPT - Student Process Tracking",
      description: "Öğrenci süreç takip uygulaması. Eğitim kurumları için öğrenci ilerlemesi ve performansının takibini sağlayan, eğitmenler ve yöneticiler için kapsamlı analiz özellikleri sunan bir sistem.",
      technologies: ["Node.JS", "Express", "MongoDB"],
      image: "https://placehold.co/600x400/e2e8f0/00BBA7?text=Student+Process+Tracking",
      github: "https://github.com/HasanBocek/SPT",
    }
  ];
</script>

<svelte:head>
  <title>Projeler | Hasan BÖCEK</title>
  <meta name="description" content="Hasan BÖCEK'in backend geliştirme projeleri">
</svelte:head>

<div class="py-12">
  <h1 class="text-4xl font-bold text-center mb-16 text-gray-800 transition-all duration-700 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">Projelerim</h1>
  
  <div class="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8">
    {#each projects as project, i}
      <div 
        class="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:shadow-xl hover:-translate-y-2 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}"
        style="transition-delay: {i * 150}ms"
      >
        <img src={project.image} alt={project.title} class="w-full h-56 object-cover" />
        
        <div class="p-6">
          <h2 class="text-2xl font-bold mb-3 text-gray-800">{project.title}</h2>
          <p class="text-gray-600 mb-4">{project.description}</p>
          
          <div class="mb-6">
            <h3 class="text-sm font-semibold text-gray-500 mb-2">Kullanılan Teknolojiler</h3>
            <div class="flex flex-wrap gap-2">
              {#each project.technologies as tech}
                <span class="px-3 py-1 bg-teal-100 text-teal-800 rounded-full text-xs font-medium">{tech}</span>
              {/each}
            </div>
          </div>
          
          <div class="flex space-x-3">
            {#if project.github}
            <a href={project.github} class="px-4 py-2 bg-gray-800 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition duration-300 inline-flex items-center">
              <i class="bx bxl-github text-xl mr-2"></i>
              GitHub
            </a>
            {/if}
            {#if project.liveDemo}
            <a href={project.liveDemo} class="px-4 py-2 bg-teal-700 text-white rounded-lg text-sm font-medium hover:bg-teal-800 transition duration-300 inline-flex items-center">
              <i class="bx bx-link-external text-xl mr-2"></i>
              Demo
            </a>
            {/if}
          </div>
        </div>
      </div>
    {/each}
  </div>
  
  <div class="max-w-4xl mx-auto mt-20 px-4">
    <h2 class="text-2xl font-bold mb-6 text-gray-800">Proje Yaklaşımım</h2>
    <div class="bg-white rounded-lg shadow-lg p-8 border-l-4 border-teal-500">
      <p class="text-gray-600 mb-4">
        Projelerimde her zaman ölçeklenebilirlik, güvenlik, ve bakım kolaylığını ön planda tutuyorum. Kod kalitesi ve temiz mimari, yazılım geliştirme sürecimde vazgeçilmez unsurlardır.
      </p>
      <p class="text-gray-600">
        Backend sistemlerinde performans optimizasyonu ve veritabanı tasarımı konularında uzmanlaşmaya çalışıyorum. Her projede, kullanıcı ihtiyaçlarını karşılayan, aynı zamanda teknik açıdan da güçlü çözümler üretmeyi hedefliyorum.
      </p>
    </div>
  </div>
</div> 