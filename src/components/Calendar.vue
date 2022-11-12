<script setup>
import {reactive, ref, watch} from "vue";
import {default as dateHelper} from "../helpers/date";

const emit = defineEmits(["dayPick"]);
const props = defineProps({userInfo: Object, getWeightFromHistory: Function});
const currentTime = new Date();

const getAllAmountOfDaysFromMonth = date => {
	const temporaryDate = new Date(date);
	temporaryDate.setMonth(date.getMonth() + 1);
	temporaryDate.setDate(1);
	temporaryDate.setDate(0);
	const allDaysInMonth = temporaryDate.getDate();
	return allDaysInMonth;
};

const date = ref(currentTime);

const data = reactive({
	amountOfDays: getAllAmountOfDaysFromMonth(date.value),
	startDay: new Date(new Date(date.value).setDate(1)).getDay()
});

const getConditions = (day, column, row) => {
	const isCurrent = day === currentTime.getDate() && currentTime.getMonth() === date.value.getMonth() && currentTime.getYear() === date.value.getYear();
	const isShown = day > data.amountOfDays || (column <= data.startDay && row === 1);
	const isLocked =
		(day > date.value.getDate() && date.value.getMonth() >= currentTime.getMonth()) ||
		date.value.getFullYear() > currentTime.getFullYear() ||
		date.value.getMonth() > currentTime.getMonth();

	const pickedDate = new Date(date.value);
	pickedDate.setDate(day);

	const isTracked = props.getWeightFromHistory(pickedDate);

	return {
		isCurrent,
		isShown,
		isLocked,
		isTracked
	};
};

watch(date, newDate => {
	data.amountOfDays = getAllAmountOfDaysFromMonth(newDate);
	data.startDay = new Date(new Date(newDate).setDate(1)).getDay();
});

const styleDayPicker = (days, day) => {
	days.forEach(item => item.classList.remove("calendar__item--active"));
	day.classList.add("calendar__item--active");
};

const handleDayPick = e => {
	const day = e.target.closest(".calendar__item");
	if (!day) return;
	const days = [...day.closest(".calendar-content").querySelectorAll(".calendar__item")];
	styleDayPicker(days, day);
	const newDate = new Date(date.value);
	newDate.setDate(day.dataset.day);
	emit("day-pick", {date: new Date(dateHelper.formatDateMDY(newDate))});
};

const handleNextMonth = () => {
	const nextMonthDate = new Date(date.value);
	nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
	date.value = nextMonthDate;
};

const handlePreviousMonth = () => {
	const previousMonthDate = new Date(date.value);
	previousMonthDate.setMonth(previousMonthDate.getMonth() - 1);
	date.value = previousMonthDate;
};
</script>
<template>
	<div class="calendar-cnt">
		<div class="calendar-cnt-header">
			<button class="calendar-cnt-header__button" @click="handlePreviousMonth">
				<ion-icon name="chevron-back-outline"></ion-icon>
			</button>
			<h1 class="calendar-cnt-header__title">{{ dateHelper.months[date.getMonth()] }} {{ date.getFullYear() }}</h1>
			<button class="calendar-cnt-header__button" @click="handleNextMonth">
				<ion-icon name="chevron-forward-outline"></ion-icon>
			</button>
		</div>
		<div class="calendar-cnt-content">
			<table class="calendar">
				<thead class="calendar-header">
					<tr class="calendar__row">
						<th class="calendar__item calendar__item--header" v-for="(weekDay, index) in dateHelper.weekDays" :key="`${weekDay}-${index}`">{{ weekDay.substr(0, 1) }}</th>
					</tr>
				</thead>
				<tbody class="calendar-content" @click="handleDayPick" :set="(dayCounter = 1)">
					<tr v-for="n in 6" :key="n" class="calendar__row">
						<td
							v-for="column in 7"
							class="calendar__item"
							:key="`${dayCounter}-${column}`"
							:class="{
								'calendar__item--current': getConditions(dayCounter, column, n).isCurrent,
								'calendar__item--disabled': getConditions(dayCounter, column, n).isShown,
								'calendar__item--tracked': getConditions(dayCounter, column, n).isTracked,
								'calendar__item--off': getConditions(dayCounter, column, n).isLocked
							}"
							:data-day="dayCounter"
						>
							{{ column <= data.startDay && n === 1 ? "" : dayCounter <= data.amountOfDays ? dayCounter++ : "" }}
						</td>
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</template>
<style scoped></style>
