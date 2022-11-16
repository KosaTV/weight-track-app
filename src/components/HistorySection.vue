<script setup>
import {ref} from "vue";
import MainWeightStats from "./MainWeightStats.vue";
import ConfirmPopup from "./ConfirmPopup.vue";
import WeightStats from "./WeightStats.vue";
import Box from "./Box.vue";
import Calendar from "./Calendar.vue";
import {default as dateHelper} from "../helpers/date";

const eventTypes = {
	INCREASE: "INCREASE",
	DECREASE: "DECREASE"
};

const props = defineProps([
	"defaultProfileImage",
	"colors",
	"userDetails",
	"addWeightToHistory",
	"getLastWeightFromHistory",
	"removeWeightfromHistory",
	"removeWeightFromHistory",
	"getWeightFromHistory",
	"loadUserData",
	"toggleAppTheme",
	"colors,",
	"userPreviousData",
	"togglePopup",
	"sectionId",
	"popups"
]);
const emit = defineEmits(["update-weight", "open-popup"]);

const pickedDate = ref(new Date());
const modifiedWeightDiff = ref(0);

const modifyWeight = () => {
	const newWeight = getUserDateWeightFromPickedDate() + modifiedWeightDiff.value;
	props.addWeightToHistory(newWeight, pickedDate.value);
	modifiedWeightDiff.value = 0;
};

const addNewWeightData = () => {
	props.togglePopup("updateWeightPopup", {date: pickedDate.value});
};

const handleWeightChange = (type = eventTypes.INCREASE) => {
	if (type === eventTypes.INCREASE) modifiedWeightDiff.value += 0.1;
	else if (type === eventTypes.DECREASE) modifiedWeightDiff.value -= 0.1;
	modifiedWeightDiff.value = +modifiedWeightDiff.value.toFixed(1);
};

const handleDayPick = data => {
	modifiedWeightDiff.value = 0;
	pickedDate.value = data.date;
};

const getUserDateWeightFromPickedDate = () => {
	return +props.userDetails.weightHistory?.[pickedDate.value.getFullYear()]?.[pickedDate.value.getMonth() + 1]?.[pickedDate.value.getDate()]?.weight;
};

const deleteWeight = () => {
	props.removeWeightFromHistory(pickedDate.value);
};

const getWeight = () => {
	let weight = (getUserDateWeightFromPickedDate() + modifiedWeightDiff.value).toFixed(1);
	if (weight.endsWith(".0")) weight = Math.round(weight);
	return weight;
};
</script>
<template>
	<Box :no-header="true">
		<template #content><Calendar @dayPick="handleDayPick" :userDetails="props.userDetails" :getWeightFromHistory="getWeightFromHistory" /></template>
	</Box>
	<Box v-if="pickedDate" :header-style="{margin: '1rem'}">
		<template #header>
			<h1 class="calendar-info">Your weight on {{ pickedDate.getDate() }} {{ dateHelper.months[pickedDate.getMonth()] }}</h1>
		</template>
		<template #content>
			<div class="history-weight-data" v-if="getUserDateWeightFromPickedDate()">
				<div class="weight-data-cnt">
					<button
						class="button weight-data__button"
						@click="
							() => {
								handleWeightChange(eventTypes.DECREASE);
							}
						"
					>
						<ion-icon name="chevron-back-outline"></ion-icon>
					</button>
					<span class="history-weight-data__weight">{{ getWeight() + " " + userDetails.unit }}</span>
					<button class="button weight-data__button" @click="handleWeightChange(eventTypes.INCREASE)">
						<ion-icon name="chevron-forward-outline"></ion-icon>
					</button>
				</div>
				<div class="history-weight-data__fn-cnt">
					<button class="button" :class="{'button--off': modifiedWeightDiff === 0}" @click="modifyWeight">Save</button>
					<button class="button button--option" @click="() => togglePopup('confirmPopup')">
						<p class="button__icon"><ion-icon name="trash"></ion-icon></p>
					</button>
				</div>
			</div>
			<div class="history-weight-data" v-else>
				<span class="history-weight-data__weight">No track</span>
				<button class="button" @click="addNewWeightData">
					Add weight
					<p class="button__icon"><ion-icon name="add-outline"></ion-icon></p>
				</button>
			</div>
		</template>
	</Box>
	<ConfirmPopup :popups="popups" :action="deleteWeight" :togglePopup="togglePopup">
		<template #title>Delete weight</template>
		<p class="confirm-popup-description">Are you sure you want to delete weight?</p>
		<section class="confirm-popup-action-cnt">
			<button class="button">Yep</button>
			<button class="button button--secondary" type="button" @click="() => togglePopup('confirmPopup')">Nah</button>
		</section>
	</ConfirmPopup>
</template>
<style scoped></style>
