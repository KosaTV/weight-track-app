<script setup>
const closePopup = () => {};

defineEmits(["close-popup"]);
const props = defineProps({width: String, height: String});
</script>

<template>
	<Teleport to=".app">
		<div class="popup-scene" @click.self="$emit('close-popup')">
			<Transition name="popup">
				<section class="popup" :style="{width: props.width, height: props.height}">
					<header class="popup__header">
						<h2 class="popup__title">
							<slot name="header" />
						</h2>
						<button class="popup__close-btn" @click="$emit(`close-popup`)">
							<ion-icon name="close-outline"></ion-icon>
						</button>
					</header>
					<section class="popup__content">
						<slot />
					</section>
				</section>
			</Transition>
		</div>
	</Teleport>
</template>

<style scoped>
.popup-enter-active,
.popup-leave-active {
	transition: opacity 1s 0s ease;
}

.popup-enter-from,
.popup-leave-to {
	opacity: 0;
	transform: scale(1.1);
}
</style>
