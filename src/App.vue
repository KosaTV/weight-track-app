<script setup>
import Menu from "../src/components/Menu.vue";
import {default as dateHelper} from "../src/helpers/date";

import HomeSection from "../src/components/HomeSection.vue";
import HistorySection from "../src/components/HistorySection.vue";
import SettingsSection from "../src/components/SettingsSection.vue";
import ProfileSection from "../src/components/ProfileSection.vue";
import {reactive, shallowRef, ref, onBeforeMount, watch} from "vue";

const appTheme = reactive({dark: window.matchMedia("(prefers-color-scheme:dark)") ? true : false});

const sectionId = shallowRef(0);

let userDetails = reactive({
	name: "Jacob",
	lastName: "Morrow",
	darkTheme: appTheme.dark,
	currentWeight: "73.5",
	startWeight: "62",
	goalWeight: "80",
	unit: "kg",
	BMI: "23.5",
	weightHistory: {
		2022: {
			9: {
				26: {
					weight: "72.5",
					unit: "kg"
				}
			}
		}
	}
});

const newWeight = ref(userDetails.currentWeight);

const popups = reactive({popup: false});

const togglePopup = () => {
	popups.popup = !popups.popup;
};

const addUserDataToStorage = () => {
	localStorage.setItem("userDetails", JSON.stringify(userDetails));
};

const loadUserData = () => {
	const userData = localStorage.getItem("userDetails");
	if (userData) {
		const userDataObject = JSON.parse(userData);
		for (let property in userDataObject) {
			userDetails[property] = userDataObject[property];
		}
	} else {
		addUserDataToStorage();
	}
};

const getTheme = () => {
	if (userDetails.darkTheme) {
		setDarkTheme();
	} else {
		setWhiteTheme();
	}
};

const initConfiguration = () => {
	loadUserData();
	getTheme();
};

const setDarkTheme = () => {
	document.body.classList.add("theme--dark");
	document.body.classList.remove("theme--default");

	colors.accentColor = "hsl(238, 35%, 15%)";
	colors.secondColor = "hsl(238, 35%, 8%)";
	colors.text = "hsl(0, 0%, 100%)";
};

const setWhiteTheme = () => {
	document.body.classList.remove("theme--dark");
	document.body.classList.add("theme--default");

	colors.accentColor = "hsl(0 0% 96%)";
	colors.secondColor = "white";
	colors.text = "hsl(238, 35%, 8%)";
};

const toggleAppTheme = () => {
	appTheme.dark = !appTheme.dark;
	if (appTheme.dark) {
		setDarkTheme();
		return;
	}

	setWhiteTheme();
	return;
};

const colors = reactive({
	accentColor: userDetails.darkTheme ? "hsl(238, 35%, 15%)" : "hsl(0 0% 96%)",
	secondColor: userDetails.darkTheme ? "hsl(238, 35%, 8%)" : "white",
	text: userDetails.darkTheme ? "hsl(0, 0%, 100%)" : "hsl(238, 35%, 8%)"
});

const sectionsData = reactive([
	{icon: `<ion-icon name="home-outline"></ion-icon>`, text: "Home", active: true},
	{icon: `<ion-icon name="calendar-clear-outline"></ion-icon>`, text: "History", active: false},
	{icon: `<ion-icon name="settings-outline"></ion-icon>`, text: "Settings", active: false}
]);

const sections = reactive([
	{
		id: 0,
		name: "Home",
		content: HomeSection
	},
	{
		id: 1,
		name: "History",
		content: HistorySection
	},
	{
		id: 2,
		name: "Settings",
		content: SettingsSection
	},
	{
		id: 3,
		name: "Profile",
		content: ProfileSection
	}
]);

onBeforeMount(() => {
	initConfiguration();
});

watch(userDetails, updatedHistory => {
	addUserDataToStorage();
});

const getStoragePlaceForDate = (year, month, day) => {
	if (!userDetails.weightHistory[year]) userDetails.weightHistory[year] = {};
	if (!userDetails.weightHistory[year][month]) userDetails.weightHistory[year][month] = {};
	if (!userDetails.weightHistory[year][month][day]) userDetails.weightHistory[year][month][day] = {};
};

const getWeightFromHistory = (date = new Date()) => {
	const {year, month, day} = dateHelper.getDateDetails(date);
	return userDetails.weightHistory?.[year]?.[month]?.[day];
};

const updateWeight = () => {
	const {year, month, day} = dateHelper.getDateDetails(new Date());
	const latestWeight = userDetails.weightHistory?.[year]?.[month]?.[day];
	if (!latestWeight) return;
	userDetails.currentWeight = latestWeight.weight;
	userDetails.unit = latestWeight.unit;
	1;
};

const addWeightToHistory = (weight, unit = "kg", date = new Date()) => {
	const {year, month, day} = dateHelper.getDateDetails(date);
	getStoragePlaceForDate(year, month, day);
	userDetails.weightHistory[year][month][day] = {weight, unit};
	updateWeight();
};
</script>

<template>
	<header class="app-header">
		<section class="section">
			<h5 class="section__header section__header--secondary">Overview</h5>
			<h1 class="section__header section__header--main">{{ sections[sectionId].name }}</h1>
		</section>
		<section class="profile" @click="() => (sectionId = 3)">
			<div class="img-section">
				<div class="profile-cnt">
					<img
						src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
						alt="profile"
						class="profile__img"
					/>
					<div class="profile__status"></div>
				</div>
			</div>
		</section>
	</header>
	<main class="main">
		<KeepAlive>
			<component
				@update-weight="updateWeight"
				@open-popup="togglePopup"
				:is="sections[sectionId].content"
				:app-theme="appTheme"
				:user-info="userDetails"
				:toggle-app-theme="toggleAppTheme"
				:colors="colors"
				:add-weight-to-history="addWeightToHistory"
				:get-weight-from-history="getWeightFromHistory"
			/>
		</KeepAlive>
	</main>
	<Menu :sectionsData="sectionsData" :sections="sections" @change-section="id => (sectionId = id)" />
	<Popup v-if="popups.popup" @close-popup="togglePopup" height="290px">
		<template #header>Update Weight</template>
		<form
			class="update-weight-popup-cnt"
			@submit="
				() => {
					addWeightToHistory(newWeight);
					togglePopup();
				}
			"
		>
			<section class="update-weight-popup-cnt__main">
				<label for="update-weight-input" class="update-weight-popup-cnt__label"> Your Weight (kg)</label>
				<input id="update-weight-input" v-model="newWeight" class="input update-weight-popup-cnt__input" type="text" />
			</section>
			<button class="button button--long">Save</button>
		</form>
	</Popup>
</template>

<style scoped></style>
