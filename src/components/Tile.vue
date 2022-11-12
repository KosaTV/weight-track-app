<script setup>
defineProps({title: String, buttonText: String});
</script>
<template>
	<section class="tile">
		<header class="tile__header">
			<h2 class="tile__header-title">{{ title }}</h2>
			<button class="tile__button">{{ buttonText }}</button>
		</header>
		<section class="tile__content">
			<slot />
		</section>
	</section>
</template>
<style scoped></style>
