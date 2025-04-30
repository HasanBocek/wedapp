<script>
	export let authorName = '';
	export let messageText = '';
	export let onAuthorNameChange = () => {};
	export let onMessageTextChange = () => {};
</script>

<label for="author" class="mb-2 block text-sm font-medium text-gray-900"> İsim Soyisim </label>
<input
	type="text"
	id="author"
	bind:value={authorName}
	on:change={onAuthorNameChange}
	class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500
	focus:ring-pink-500"
	placeholder="John & Doe"
/>

<label for="message" class="mb-2 block text-sm font-medium text-gray-900"> Mesajınız </label>
<textarea
	id="message"
	bind:value={messageText}
	on:change={onMessageTextChange}
	rows="4"
	class="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5
	text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
	placeholder="Düşüncelerinizi paylaşın..."
	maxlength="500"
></textarea> 