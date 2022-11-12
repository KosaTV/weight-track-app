<script setup>
import Box from "./Box.vue";
import Toggler from "./Toggler.vue";

const props = defineProps({toggleAppTheme: Function, appTheme: Object});
</script>
<template>
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
						<Toggler :toggle="props.appTheme.dark" @toggle="toggleAppTheme" />
					</div>
				</li>
				<li class="settings-list-item">
					<div class="settings-list-item__text">
						<span class="settings-list-item__icon">
							<ion-icon name="person-circle-outline"></ion-icon>
						</span>
						<h2 class="settings-list-item__name">Profile</h2>
					</div>
				</li>
				<li class="settings-list-item">
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
</template>
<style scoped></style>
