<script setup>
import {ref, watch} from "vue";
const id = "aboutAppPopup";
const props = defineProps(["popups", "togglePopup"]);
</script>
<template>
	<Popup :popups="popups" :id="id" @close-popup="() => togglePopup(id)" height="80%">
		<template #header>About application</template>
		<h3 style="text-align: center; margin-bottom: 2rem">Weight Track App (Alpha) 1.0.0</h3>
		<p style="text-align: center; line-height: 1.5; letter-spacing: 0.9px">
			Weight Track App is the application for your weight track needs. You can add your weight progress every day and controll, how fast you want to achive your goal weight.
			Remember! Informations about your health provided by application are just predicted and shouldn't be taken 100% surely. If you feel some issues with your health you
			should contact with health doctor,regardless information included in the application.
		</p>
	</Popup>
</template>
<style scoped></style>
