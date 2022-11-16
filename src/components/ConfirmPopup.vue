<script setup>
import {ref, watch} from "vue";

const props = defineProps(["popups", "togglePopup", "title", "content", "action"]);
const id = "confirmPopup";
</script>
<template>
	<Popup :popups="popups" :id="id" @close-popup="() => togglePopup(id)" height="290px">
		<template #header><slot name="title" /></template>
		<form
			class="confirm-popup-form"
			@submit.prevent="
				() => {
					action();
					togglePopup(id);
				}
			"
		>
			<slot />
		</form>
	</Popup>
</template>
<style scoped></style>
