<script setup>
import {ref, reactive, onMounted, watch} from "vue";
import {Doughnut} from "vue-chartjs";
import {Chart, Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale} from "chart.js";
Chart.register(Title, Tooltip, Legend, ArcElement, CategoryScale, LinearScale);
const props = defineProps({title: String, buttonText: String, userDetails: Object, colors: Object});

const initStyles = {
	display: "flex",
	justifyContent: "center",
	height: "165px",
	width: "100%"
};

const chartElement = ref(null);

const getWeightProgress = () => {
	let progress = (((props.userDetails.currentWeight - props.userDetails.startWeight) / (props.userDetails.goalWeight - props.userDetails.startWeight)) * 100).toFixed();
	return progress;
};

let weightFactor = [];
let gainedWeight;
let weightLabel;

const doughnutData = reactive({
	colors: ref(["hsl(165, 100%, 39%)", props.colors.accentColor]),
	centeredText: {
		title: "Now",
		mainContent: null,
		description: null
	}
});

const drawWeightStats = (chart, args, options) => {
	const {
		ctx,
		chartArea: {top, left, bottom, right, width, height}
	} = chart;

	ctx.save();
	const title = "bold 1.75rem Inter";
	ctx.font = title;
	ctx.fillStyle = props.colors.text;
	ctx.textAlign = "center";
	ctx.fillText(doughnutData.centeredText.title, width / 2, height / 2 - 10);
	ctx.restore();
	const mainContent = "bold 2.5rem Inter";
	ctx.font = mainContent;
	ctx.fillStyle = doughnutData.colors[0];
	ctx.textAlign = "center";
	ctx.fillText(doughnutData.centeredText.mainContent, width / 2, height / 2 + 25);
	ctx.restore();
	const description = "normal 1.5rem Inter";
	ctx.font = description;
	ctx.fillStyle = "hsl(0 0% 70%)";
	ctx.textAlign = "center";
	ctx.fillText(doughnutData.centeredText.description, width / 2, height / 2 + 55);
	ctx.restore();
};

const drawWeightBorders = (chart, args, options) => {
	const {
		ctx,
		chartArea: {top, left, bottom, right, width, height}
	} = chart;

	ctx.save();
	ctx.font = "900 1.5rem Inter";
	ctx.fillStyle = "hsl(0 0% 60%)";
	ctx.textAlign = "center";
	ctx.fillText(`${props.userDetails.startWeight}`, 12, height);
	ctx.restore();
	ctx.font = "900 1.5rem Inter";
	ctx.fillStyle = "hsl(0 0% 60%)";
	ctx.textAlign = "center";
	ctx.fillText(`${props.userDetails.goalWeight}`, width - 12, height);
	ctx.restore();
};

const drawCenteredText = {
	id: "drawCenteredText",
	afterDraw: drawWeightStats
};

const drawLabelsText = {
	id: "drawLabelsText",
	afterDraw: drawWeightBorders
};

const chartData = reactive({
	labels: ["Gained", "left"],
	datasets: [
		{
			label: "My Weight",
			data: weightFactor,
			backgroundColor: doughnutData.colors,
			borderWidth: 0,
			hoverOffset: 4
		}
	]
});

const plugins = reactive([drawCenteredText, drawLabelsText]);

watch(props.userDetails, newUserInfo => {
	const progress = getWeightProgress();
	weightFactor = [progress, 100 - progress];
	if (progress >= 0) weightLabel = "Gained";
	else weightLabel = "Lost";
	if (progress > 100) weightFactor = [100, 0];
	else if (progress < 0) weightFactor = [0, 100];

	chartData.datasets[0].data = weightFactor;

	const ctx = chartElement.value.getContext("2d");
	const gradient = ctx.createLinearGradient(0, 135, 120, 120);
	gradient.addColorStop(0, "hsla(165, 100%, 39%,.1)");
	gradient.addColorStop(1, "hsl(165, 100%, 39%)");

	doughnutData.colors = [gradient, props.colors.accentColor];
	doughnutData.centeredText.mainContent = `${props.userDetails.currentWeight} ${props.userDetails.unit}`;
	gainedWeight = (props.userDetails.currentWeight - props.userDetails.startWeight).toFixed();
	doughnutData.centeredText.description = `${weightLabel} ~ ${Math.abs(gainedWeight)} ${props.userDetails.unit}`;
	chartData.datasets[0].backgroundColor = doughnutData.colors;
});

const chartOptions = {
	rotation: -90,
	circumference: 180,
	responsive: true,
	maintainAspectRatio: false,
	cutout: 67.5,
	borderRadius: 10,
	events: [],
	plugins: {
		legend: {
			display: false
		}
	}
};

onMounted(() => {
	chartElement.value = document.querySelector("#doughnut-chart");
	const ctx = chartElement.value.getContext("2d");
	const gradient = ctx.createLinearGradient(0, 135, 120, 120);
	gradient.addColorStop(0, "hsla(165, 100%, 39%,.1)");
	gradient.addColorStop(1, "hsl(165, 100%, 39%)");
	doughnutData.colors[0] = gradient;

	gainedWeight = (props.userDetails.currentWeight - props.userDetails.startWeight).toFixed();
	weightLabel = gainedWeight >= 0 ? "Gained" : "Lost";
	doughnutData.centeredText.mainContent = `${props.userDetails.currentWeight} ${props.userDetails.unit}`;
	doughnutData.centeredText.description = `${weightLabel} ~ ${Math.abs(gainedWeight)} ${props.userDetails.unit}`;

	const progress = getWeightProgress();
	weightFactor = [progress, 100 - progress];
	if (progress >= 0) weightLabel = "Gained";
	else weightLabel = "Lost";
	if (progress > 100) weightFactor = [100, 0];
	else if (progress < 0) weightFactor = [0, 100];
	chartData.datasets[0].data = weightFactor;
});
</script>
<template>
	<Doughnut :chart-data="chartData" :styles="initStyles" :chart-options="chartOptions" :plugins="plugins" />
</template>
<style scoped></style>
