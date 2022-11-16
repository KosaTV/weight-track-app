<script setup>
import {watch} from "vue";
import Box from "./Box.vue";
import Toggler from "./Toggler.vue";

const props = defineProps([
	"defaultProfileImage",
	"colors",
	"userDetails",
	"addWeightToHistory",
	"getWeightFromHistory",
	"loadUserData",
	"toggleAppTheme",
	"colors,",
	"userPreviousData",
	"togglePopup",
	"sectionId",
	"popups"
]);
const emit = defineEmits(["updateWeight", "openPopup"]);
const goToProfileSection = () => {
	props.sectionId = 3;
	console.log(props.sectionId);
};
</script>
<template>
	<div>
		<Box>
			<template #header>
				<h1 class="box__title">General</h1>
			</template>
			<template #content>
				<ol class="settings-list">
					<li @click="toggleAppTheme" class="settings-list-item settings-list-item--toggler">
						<div class="settings-list-item__text">
							<span class="settings-list-item__icon">
								<ion-icon name="contrast-outline"></ion-icon>
							</span>
							<h2 class="settings-list-item__name">Dark theme</h2>
						</div>
						<div class="settings-list-item__action">
							<Toggler :toggle="userDetails.darkTheme" @toggle="toggleAppTheme" />
						</div>
					</li>
					<li @click="goToProfileSection" class="settings-list-item">
						<div class="settings-list-item__text">
							<span class="settings-list-item__icon">
								<ion-icon name="person-circle-outline"></ion-icon>
							</span>
							<h2 class="settings-list-item__name">Profile</h2>
						</div>
					</li>
					<li @click="() => togglePopup('aboutAppPopup')" class="settings-list-item">
						<div class="settings-list-item__text">
							<span class="settings-list-item__icon">
								<ion-icon name="help-circle-outline"></ion-icon>
							</span>
							<h2 class="settings-list-item__name">About app</h2>
						</div>
					</li>
				</ol>
			</template>
		</Box>
	</div>
</template>
<style scoped></style>
