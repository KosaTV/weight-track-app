<script setup>
defineProps({icon: String, text: String, active: Boolean});
</script>

<template>
	<a href="#" class="menu-item-link">
		<li class="menu-item" :class="{'menu-item--active': active}">
			<p class="menu-item__icon" v-html="icon"></p>
			<p class="menu-item__text">
				{{ text }}
			</p>
		</li>
	</a>
</template>
<style scoped></style>
