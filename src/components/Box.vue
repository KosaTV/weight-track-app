<script setup>
const settings = defineProps(["noHeader"]);
</script>
<template>
	<section class="box">
		<header class="box__header" :class="{'box__header--hidden': settings.noHeader}">
			<slot name="header" />
		</header>
		<section class="box__content">
			<slot name="content" />
		</section>
	</section>
</template>
<style scoped></style>
