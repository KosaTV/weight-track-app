<script setup>
import {ref} from "vue";
import MainWeightStats from "./MainWeightStats.vue";
import WeightStats from "./WeightStats.vue";
import Box from "./Box.vue";
import Calendar from "./Calendar.vue";
import {default as dateHelper} from "../helpers/date";

const eventTypes = {
	INCREASE: "INCREASE",
	DECREASE: "DECREASE"
};

const props = defineProps({userInfo: Object, addWeightToHistory: Function, getWeightFromHistory: Function});

const pickedDate = ref("");
const modifiedWeightDiff = ref(0);

const modifyWeight = () => {
	const newWeight = getUserDateWeightFromPickedDate() + modifiedWeightDiff.value;
	props.addWeightToHistory(newWeight, "kg", pickedDate.value);
	modifiedWeightDiff.value = 0;
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
	return +props.userInfo.weightHistory?.[pickedDate.value.getFullYear()]?.[pickedDate.value.getMonth() + 1]?.[pickedDate.value.getDate()]?.weight;
};

const getWeight = () => {
	let weight = (getUserDateWeightFromPickedDate() + modifiedWeightDiff.value).toFixed(1);
	if (weight.endsWith(".0")) weight = (+weight).toFixed(0);
	return weight;
};
</script>
<template>
	<Box :no-header="true">
		<template #header></template>
		<template #content><Calendar @dayPick="handleDayPick" :userInfo="props.userInfo" :getWeightFromHistory="getWeightFromHistory" /></template>
	</Box>
	<Box v-if="pickedDate">
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
					<span class="history-weight-data__weight">{{ getWeight() + " " + userInfo.unit }}</span>
					<button class="button weight-data__button" @click="handleWeightChange(eventTypes.INCREASE)">
						<ion-icon name="chevron-forward-outline"></ion-icon>
					</button>
				</div>
				<button class="button" :class="{'button--off': modifiedWeightDiff === 0}" @click="modifyWeight">Save</button>
			</div>
			<div class="history-weight-data" v-else>
				<span class="history-weight-data__weight">No track</span>
				<button class="button" @click="modifyWeight">
					Add weight
					<p class="button__icon"><ion-icon name="add-outline"></ion-icon></p>
				</button>
			</div>
		</template>
	</Box>
</template>
<style scoped></style>
