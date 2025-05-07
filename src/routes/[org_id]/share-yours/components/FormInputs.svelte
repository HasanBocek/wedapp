<script>
	export let authorName = '';
	export let messageText = '';
	export let onAuthorNameChange = () => {};
	export let onMessageTextChange = () => {};
</script>

<div class="space-y-4 sm:space-y-6">
	<div class="form-group">
		<label for="author" class="mb-2 block font-serif text-lg" style="color: var(--color-navy); font-family: var(--font-serif);">
			İsim Soyisim
		</label>
		<input
			type="text"
			id="author"
			bind:value={authorName}
			on:change={onAuthorNameChange}
			class="block w-full rounded-md border bg-white p-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
			style="border-color: var(--color-sage); color: var(--color-navy); font-family: var(--font-sans); focus-ring-color: var(--color-dusty-blue);"
			placeholder="John & Doe"
		/>
	</div>

	<div class="form-group">
		<label for="message" class="mb-2 block font-serif text-lg" style="color: var(--color-navy); font-family: var(--font-serif);">
			Mesajınız
		</label>
		<textarea
			id="message"
			bind:value={messageText}
			on:change={onMessageTextChange}
			rows="4"
			class="block w-full resize-none rounded-md border bg-white p-4 text-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-opacity-50"
			style="border-color: var(--color-sage); color: var(--color-navy); font-family: var(--font-sans); focus-ring-color: var(--color-dusty-blue);"
			placeholder="Düşüncelerinizi paylaşın..."
			maxlength="500"
		></textarea>
		<div class="mt-1 text-right text-sm" style="color: var(--color-navy); opacity: 0.7;">
			{messageText.length}/500
		</div>
	</div>
</div>

<style>
	input::placeholder, textarea::placeholder {
		opacity: 0.6;
	}
	
	input:focus, textarea:focus {
		border-color: var(--color-dusty-blue);
	}
	
	@media (max-width: 640px) {
		input, textarea {
			font-size: 16px !important; /* Prevents iOS zoom on focus */
		}
	}
</style>
