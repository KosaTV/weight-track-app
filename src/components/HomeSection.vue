<script setup>
import MainWeightStats from "./MainWeightStats.vue";
import WeightStats from "./WeightStats.vue";
import Tile from "./Tile.vue";

const props = defineProps([
	"defaultProfileImage",
	"colors",
	"userDetails",
	"addWeightToHistory",
	"getWeightFromHistory",
	"getLastWeightFromHistory",
	"loadUserData",
	"toggleAppTheme",
	"colors,",
	"userPreviousData",
	"togglePopup",
	"sectionId",
	"popups"
]);
const emit = defineEmits(["update-weight", "open-popup"]);
</script>
<template>
	<div class="tiles-cnt">
		<div class="tiles-cnt__banner tiles-cnt__banner--ease tiles-cnt__banner--top"></div>
		<div class="tiles-cnt__overlay">
			<div class="tile-cnt">
				<Tile title="Goal Progress" buttonText="Edit">
					<MainWeightStats :colors="colors" :user-details="userDetails" />
				</Tile>
				<Tile title="Statistics" buttonText="Week">
					<WeightStats
						:get-last-weight-from-history="getLastWeightFromHistory"
						:colors="colors"
						:user-details="userDetails"
						:get-weight-from-history="getWeightFromHistory"
						:user-previous-data="userPreviousData"
					/>
				</Tile>
			</div>
		</div>
		<div class="tiles-cnt__banner tiles-cnt__banner--ease tiles-cnt__banner--bottom"></div>
	</div>
	<button class="button main__button" @click="$emit('open-popup', 'updateWeightPopup')">
		Add weight
		<p class="button__icon"><ion-icon name="add-outline"></ion-icon></p>
	</button>
</template>
<style scoped></style>
