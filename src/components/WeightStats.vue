<script setup>
import {reactive} from "vue";
import {Line} from "vue-chartjs";
import {Chart, Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale} from "chart.js";
Chart.register(Title, Tooltip, Legend, PointElement, LineElement, CategoryScale, LinearScale);
const props = defineProps({title: String, buttonText: String, appTheme: Object, colors: Object});

const initStyles = {
	display: "flex",
	justifyContent: "center",
	height: "165px",
	width: "100%"
};

const chartData = reactive({
	labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
	datasets: [
		{
			label: "My Weight",
			data: [62, 63, 62.5, 65, 68, 70, 73.5],
			backgroundColor: props.colors.secondColor,
			radius: "6",
			borderWidth: 2,
			borderColor: "hsl(165, 100%, 39%)",
			tension: 0.4,
			hoverOffset: 4
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
</script>
<template>
	<Line :chart-data="chartData" :styles="initStyles" :chart-options="chartOptions" />
</template>
<style scoped></style>
