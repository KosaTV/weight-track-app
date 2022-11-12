<script setup>
import MainWeightStats from "./MainWeightStats.vue";
import WeightStats from "./WeightStats.vue";
import Tile from "./Tile.vue";

const props = defineProps({userInfo: Object, appTheme: Object, colors: Object});
const emit = defineEmits(["updateWeight"]);
</script>
<template>
	<div class="tiles-cnt">
		<div class="tiles-cnt__banner tiles-cnt__banner--top"></div>
		<div class="tiles-cnt__overlay">
			<div class="tile-cnt">
				<Tile title="Goal Progress" buttonText="Edit">
					<MainWeightStats :app-theme="appTheme" :colors="colors" :userInfo="userInfo" />
				</Tile>
				<Tile title="Statistics" buttonText="Week">
					<WeightStats :app-theme="appTheme" :colors="colors" />
				</Tile>
			</div>
		</div>
		<div class="tiles-cnt__banner tiles-cnt__banner--bottom"></div>
	</div>
	<button class="button main__button" @click="$emit('open-popup')">
		Update weight
		<p class="button__icon"><ion-icon name="add-outline"></ion-icon></p>
	</button>
</template>
<style scoped></style>
