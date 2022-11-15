<script setup>
import {ref, watch} from "vue";

const props = defineProps(["popups", "togglePopup", "addWeightToHistory", "userDetails"]);
const newWeight = ref(props.userDetails.currentWeight);
const updateWeightInput = ref(null);
const id = "updateWeightPopup";

const onUpdateWeightPopupOpen = () => {
	updateWeightInput.value.focus();
};

watch(props.userDetails, () => {
	newWeight.value = props.userDetails.currentWeight;
});
</script>
<template>
	<Popup :is-opened="popups.updateWeightPopup" @close-popup="() => togglePopup(id)" height="290px" @open="onUpdateWeightPopupOpen">
		<template #header>Update Weight</template>
		<form
			class="update-weight-popup-cnt"
			@submit.prevent="
				() => {
					addWeightToHistory(newWeight);
					togglePopup(id);
				}
			"
		>
			<section class="update-weight-popup-cnt__main">
				<label for="update-weight-input" class="update-weight-popup-cnt__label"> Your Weight (kg)</label>
				<input ref="updateWeightInput" id="update-weight-input" v-model="newWeight" step=".1" class="input update-weight-popup-cnt__input" type="number" />
			</section>
			<button class="button button--long">Save</button>
		</form>
	</Popup>
</template>
<style scoped></style>
