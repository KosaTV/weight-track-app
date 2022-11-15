<script setup>
import {ref, reactive} from "vue";
import defaultProfileImage from "../assets/imgs/default_profile.jpg";
import {getBMI} from "../helpers/bodyMeasurementFns";

const props = defineProps(["popups", "togglePopup", "userDetails"]);
const nameInput = ref(null);
const imgInput = ref(null);
const id = "profileInfoPopup";

const userFormData = reactive({
	name: props.userDetails.name,
	lastName: props.userDetails.lastName,
	profileImage: defaultProfileImage,
	height: props.userDetails.height,
	currentWeight: props.userDetails.currentWeight,
	goalWeight: props.userDetails.goalWeight,
	unit: props.userDetails.unit
});

const prepareNewProfileImage = e => {
	const img = imgInput.value.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(img);

	reader.onload = () => {
		userFormData.profileImage = reader.result;
	};
};

const setupNewUser = () => {
	for (let property in userFormData) {
		props.userDetails[property] = userFormData[property];
	}
	props.userDetails.startWeight = userFormData.currentWeight;
	props.userDetails.BMI = getBMI(userFormData.currentWeight, userFormData.height);
};

const onWelcomePopupOpen = () => {
	nameInput.value.focus();
};
</script>
<template>
	<Popup :is-opened="popups.profileInfoPopup" @close-popup="() => togglePopup(id)" height="100%" @open="onWelcomePopupOpen" noClose :mode="'center'">
		<template #header>Welcome!</template>
		<form
			class="popup-form"
			@submit.prevent="
				() => {
					togglePopup(id);
					setupNewUser();
				}
			"
		>
			<header class="popup-header">
				<h1 class="popup-header__title">Profile Picture</h1>
				<section class="profile profile--in-section">
					<div class="img-section img-section--in-section">
						<div class="profile-cnt profile-cnt--in-section">
							<label class="img-upload-field" for="profile-img">
								<span class="img-upload-field__icon">
									<ion-icon name="camera-outline"></ion-icon>
								</span>
							</label>
							<input class="file-input" type="file" name="profile-img" ref="imgInput" id="profile-img" @change="prepareNewProfileImage" />
							<img :src="userFormData.profileImage" alt="profile" class="profile__img popup__profile-img" @load="handleNewImage" />
						</div>
					</div>
				</section>
			</header>
			<section class="popup-form__content">
				<div class="popup-form__row">
					<label for="name-input" class="popup-form__label">Your Name</label>
					<input required ref="nameInput" id="name-input" v-model="userFormData.name" class="input popup-form__input" type="text" />
				</div>
				<div class="popup-form__row">
					<label for="last-name-input" class="popup-form__label">Your Last name</label>
					<input required ref="lastNameInput" id="last-name-input" v-model="userFormData.lastName" class="input popup-form__input" type="text" />
				</div>
				<div class="popup-form__row">
					<label for="current-weight" class="popup-form__label">Current weight (kg)</label>
					<input required ref="currentWeight" step=".1" id="current-weight" v-model="userFormData.currentWeight" class="input popup-form__input" type="number" />
				</div>
				<div class="popup-form__row">
					<label for="goal-weight" class="popup-form__label">Goal weight (kg)</label>
					<input required ref="goalWeight" step=".1" id="goal-weight" v-model="userFormData.goalWeight" class="input popup-form__input" type="number" />
				</div>
				<div class="popup-form__row">
					<label for="height" class="popup-form__label">Your height (cm)</label>
					<input required ref="height" step=".1" id="height" v-model="userFormData.height" class="input popup-form__input" type="number" />
				</div>
			</section>
			<button class="popup-form__button button button--long">Save</button>
		</form>
	</Popup>
</template>
<style scoped></style>
