<script>
	const educationData = [
		{
			institution: 'Karadeniz Teknik Üniversitesi',
			degree: 'Lisans - Elektrik Elektronik Mühendisliği',
			duration: '2024 - Devam Ediyor',
			description:
				'Elektrik Elektronik Mühendisliği bölümünde öğrenim görmekteyim. Teknik konulardaki altyapımı güçlendirirken, backend geliştirici olarak da kendimi geliştiriyorum.',
			projects: ['İnternet Tabanlı Uzaktan Kontrol Edilebilir Araç']
		}
	];
</script>

<svelte:head>
	<title>Eğitim | Hasan BÖCEK</title>
	<meta name="description" content="Hasan BÖCEK'in eğitim geçmişi ve akademik bilgileri" />
</svelte:head>

<div class="py-12">
	<h1 class="mb-16 text-center text-4xl font-bold text-gray-800">Eğitim Bilgilerim</h1>

	<div class="mx-auto max-w-4xl">
		{#each educationData as education}
			<div
				class="mb-8 rounded-lg border-l-4 border-teal-500 bg-white p-8 shadow-lg transition duration-300 hover:shadow-xl"
			>
				<div class="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
					<div>
						<h2 class="text-2xl font-bold text-gray-800">{education.institution}</h2>
						{#if education.degree}
							<p class="text-lg font-medium text-teal-700">{education.degree}</p>
						{/if}
					</div>
					<div
						class="inline-block rounded-full border border-teal-200 bg-gradient-to-r from-teal-50 to-emerald-100 px-4 py-2 font-medium text-teal-800 shadow-sm"
					>
						{education.duration}
					</div>
				</div>

				{#if education.description}
					<p class="mb-6 text-gray-600">{education.description}</p>
				{/if}

				{#if education.courses && education.courses.length > 0}
					<div class="mb-6">
						<h3 class="mb-3 text-lg font-semibold text-gray-700">Dersler:</h3>
						<div class="flex flex-wrap gap-2">
							{#each education.courses as course}
								<span class="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">{course}</span>
							{/each}
						</div>
					</div>
				{/if}

				{#if education.projects && education.projects.length > 0}
					<div>
						<h3 class="mb-3 text-lg font-semibold text-gray-700">Projeler:</h3>
						<div class="flex flex-wrap gap-2">
							{#each education.projects as project}
								<span class="rounded-md bg-gray-100 px-3 py-1 text-sm text-gray-700">{project}</span
								>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		{/each}
	</div>

	<div class="mx-auto mt-16 max-w-4xl">
		<h2 class="mb-6 text-2xl font-bold text-gray-800">Eğitim Felsefem</h2>
		<div class="rounded-lg border-l-4 border-teal-500 bg-white p-8 shadow-lg">
			<p class="mb-4 text-gray-600">
				Mühendislik eğitimimin, yazılım geliştirme becerilerimle birleşerek bana benzersiz bir bakış
				açısı kazandırdığına inanıyorum. Teknik bilgi ve analitik düşünme yeteneklerimi, etkin ve
				verimli yazılım çözümleri geliştirmek için kullanıyorum.
			</p>
			<p class="text-gray-600">
				Sürekli öğrenmeye ve kendimi geliştirmeye önem veriyorum. Teknolojik gelişmeleri yakından
				takip ederek, bilgilerimi güncel tutmaya ve yeni beceriler kazanmaya çalışıyorum.
			</p>
		</div>
	</div>
</div>
