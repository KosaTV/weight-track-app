<script setup>
import {watch, onUpdated} from "vue";
const emit = defineEmits(["close-popup", "open", "close"]);
const props = defineProps({width: String, height: String, isOpened: Boolean, noClose: Boolean, mode: String});

const sendFormAppearanceEvent = () => {
	if (props.isOpened) setTimeout(() => emit("open"));
	else if (!props.isOpened) setTimeout(() => emit("close"));
};

watch(
	() => props.isOpened,
	() => {
		sendFormAppearanceEvent();
	}
);

const closePopup = () => {
	if (!props.noClose) emit("close-popup");
};
</script>

<template>
	<Teleport to=".app">
		<Transition name="popup">
			<div v-if="isOpened" class="popup-scene" @click.self="closePopup">
				<section class="popup" :style="{width, height}">
					<header class="popup__header">
						<h2 class="popup__title" :class="{'popup__title--centered': mode === 'center'}">
							<slot name="header" />
						</h2>
						<button v-if="!noClose" class="popup__close-btn" @click="closePopup">
							<ion-icon name="close-outline"></ion-icon>
						</button>
					</header>
					<section class="popup__content">
						<slot />
					</section>
				</section>
			</div>
		</Transition>
	</Teleport>
</template>

<style scoped></style>
