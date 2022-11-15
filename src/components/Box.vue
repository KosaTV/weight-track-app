<script setup>
const settings = defineProps(["noHeader", "headerStyle", "contentStyle"]);
</script>
<template>
	<section class="box">
		<header class="box__header" :class="{'box__header--hidden': settings.noHeader}" :style="settings.headerStyle">
			<slot name="header" />
		</header>
		<section class="box__content" :style="settings.contentStyle">
			<slot name="content" />
		</section>
	</section>
</template>
<style scoped></style>
