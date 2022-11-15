<script setup>
import {ref} from "vue";
import Box from "./Box.vue";
import Toggler from "./Toggler.vue";

const props = defineProps({userDetails: Object, defaultProfileImage: String, loadUserData: Function});
const imgInput = ref(null);
const newImage = ref(null);

const prepareNewProfileImage = e => {
	const img = imgInput.value.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(img);

	reader.onload = () => {
		newImage.value = reader.result;
	};
};

const handleNewImage = e => {
	if (!newImage.value) return;
	props.userDetails.profileImage = newImage.value;
};
</script>
<template>
	<div class="tiles-cnt">
		<div class="tiles-cnt__banner tiles-cnt__banner--top tiles-cnt__banner--ease"></div>
		<div class="tiles-cnt__overlay">
			<header class="profile-header">
				<section class="profile profile--in-section">
					<div class="img-section img-section--in-section">
						<div class="profile-cnt profile-cnt--in-section">
							<label class="img-upload-field" for="profile-img">
								<span class="img-upload-field__icon">
									<ion-icon name="camera-outline"></ion-icon>
								</span>
							</label>
							<input class="file-input" type="file" name="profile-img" ref="imgInput" id="profile-img" @change="prepareNewProfileImage" />
							<img :src="newImage || userDetails.profileImage || defaultProfileImage" alt="profile" class="profile__img" @load="handleNewImage" />
							<div class="profile__status profile__status--in-section"></div>
						</div>
					</div>
				</section>
				<section class="section">
					<h1 class="section__header section__header--main section__header--in-section">{{ userDetails.name }} {{ userDetails.lastName }}</h1>
				</section>
			</header>
			<Box>
				<template #header>
					<h1 class="box__title">Profile</h1>
				</template>
				<template #content>
					<ol class="profile-info-list">
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Name</span>
							<span class="profile-info-list__data">{{ userDetails.name }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Last name</span>
							<span class="profile-info-list__data">{{ userDetails.lastName }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Current weight</span>
							<span class="profile-info-list__data">{{ userDetails.currentWeight }} {{ userDetails.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Start weight</span>
							<span class="profile-info-list__data">{{ userDetails.startWeight }} {{ userDetails.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Goal weight</span>
							<span class="profile-info-list__data">{{ userDetails.goalWeight }} {{ userDetails.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Unit</span>
							<span class="profile-info-list__data">{{ userDetails.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">BMI</span>
							<span class="profile-info-list__data">{{ userDetails.BMI }}</span>
						</li>
					</ol>
				</template>
			</Box>
			<div class="profile-config-cnt">
				<button class="button" @click="$emit('open-popup', 'profileInfoPopup')">
					<span class="button__icon"> <ion-icon name="create-outline"></ion-icon></span>
					Edit profile
				</button>
			</div>
		</div>
		<div class="tiles-cnt__banner tiles-cnt__banner--bottom tiles-cnt__banner--ease"></div>
	</div>
</template>
<style scoped></style>
