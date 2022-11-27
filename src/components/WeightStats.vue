<script setup>
import {reactive, onMounted, watch} from "vue";
import {Line} from "vue-chartjs";
import date from "../helpers/date";
import {Chart, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale} from "chart.js";
Chart.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale);
const props = defineProps({
	title: String,
	buttonText: String,
	userDetails: Object,
	colors: Object,
	getWeightFromHistory: Function,
	userPreviousData: String,
	getLastWeightFromHistory: Function
});

let last7Days = [];
let weekDays = [];

const getWeightInfoFrom7Days = () => {
	last7Days = [];
	weekDays = [];
	for (let i = 0; i <= 6; i++) {
		const now = new Date();
		now.setDate(new Date().getDate() - i);
		let weight = props.getWeightFromHistory(now)?.weight;
		weekDays.push(date.weekDays[now.getDay()].substr(0, 3));
		last7Days.push(weight);
	}
	weekDays.reverse();
	last7Days.reverse();
};

const initStyles = {
	display: "flex",
	justifyContent: "center",
	height: "165px",
	width: "100%"
};

const chartData = reactive({
	labels: weekDays,
	datasets: [
		{
			label: "My Weight",
			data: last7Days,
			backgroundColor: props.colors.secondColor,
			radius: "7",
			borderWidth: 2,
			borderColor: "hsl(165, 100%, 39%)",
			tension: 0.4,
			hoverOffset: 32
		}
	]
});

const chartOptions = {
	rotation: -90,
	maintainAspectRatio: false,
	responsive: true,
	circumference: 180,
	hover: {mode: null},
	plugins: {
		legend: {
			display: false
		},
		tooltip: {
			titleColor: "white",
			backgroundColor: "hsl(165, 100%, 39%)",
			bodyColor: "white"
		}
	},
	scales: {
		x: {
			grid: {
				display: false
			},
			ticks: {
				color: "hsl(0,0%,70%)"
			}
		},
		y: {
			grid: {
				color: "hsl(0,0%,95%)",
				borderDash: [2, 0, 2],
				borderDashOffset: 0.1,
				drawTicks: false
			},
			ticks: {
				autoSkip: true,
				maxTicksLimit: 5,
				color: "hsl(0,0%,70%)"
			}
		}
	}
};

watch(props.userDetails, () => {
	getWeightInfoFrom7Days();

	chartData.datasets[0].backgroundColor = props.colors.secondColor;
	chartData.datasets[0].data = last7Days;
	chartData.labels = weekDays;
});

onMounted(() => {
	if (props.userPreviousData?.length) getWeightInfoFrom7Days();
	chartData.datasets[0].data = last7Days;
	chartData.labels = weekDays;
});
</script>
<template>
	<Line :chart-data="chartData" :styles="initStyles" :chart-options="chartOptions" />
</template>
<style scoped></style>
