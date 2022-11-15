<script setup>
import Menu from "../src/components/Menu.vue";
import {default as dateHelper} from "../src/helpers/date";
import ProfileInfoPopup from "../src/components/ProfileInfoPopup.vue";
import UpdateWeightPopup from "../src/components/UpdateWeightPopup.vue";
import HomeSection from "../src/components/HomeSection.vue";
import HistorySection from "../src/components/HistorySection.vue";
import SettingsSection from "../src/components/SettingsSection.vue";
import ProfileSection from "../src/components/ProfileSection.vue";
import {reactive, markRaw, ref, onBeforeMount, watch} from "vue";

const sectionId = ref(0);
const userPreviousData = ref(localStorage.getItem("userDetails"));

const userDetails = reactive({
	name: "",
	lastName: "",
	profileImage: "",
	height: "",
	darkTheme: window.matchMedia("(prefers-color-scheme:dark)").matches ? true : false,
	currentWeight: "",
	startWeight: "",
	goalWeight: "",
	unit: "kg",
	BMI: "",
	weightHistory: {
		2022: {
			11: {
				8: {
					weight: "72",
					unit: "kg"
				},
				9: {
					weight: "73",
					unit: "kg"
				},
				10: {
					weight: "73",
					unit: "kg"
				},
				11: {
					weight: "73",
					unit: "kg"
				},
				12: {
					weight: "76",
					unit: "kg"
				},
				13: {
					weight: "73",
					unit: "kg"
				},
				14: {
					weight: "80",
					unit: "kg"
				},
				15: {
					weight: "80",
					unit: "kg"
				}
			}
		}
	}
});

const togglePopup = name => {
	popups[name] = !popups[name];
};

const addUserDataToStorage = () => {
	localStorage.setItem("userDetails", JSON.stringify(userDetails));
};

const loadUserData = () => {
	if (userPreviousData.value) {
		const userPreviousDataObject = JSON.parse(userPreviousData.value);
		for (let property in userPreviousDataObject) {
			userDetails[property] = userPreviousDataObject[property];
		}
	}
};

const popups = reactive({updateWeightPopup: false, profileInfoPopup: !userPreviousData.value});

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
	userDetails.darkTheme = !userDetails.darkTheme;
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

const sections = markRaw([
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

const initConfiguration = () => {
	loadUserData();
	userDetails.darkTheme ? setDarkTheme() : setWhiteTheme();
};

onBeforeMount(() => {
	initConfiguration();
});

watch(userDetails, () => {
	addUserDataToStorage();
	userDetails.darkTheme ? setDarkTheme() : setWhiteTheme();
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
					<img :src="userDetails.profileImage" alt="profile" class="profile__img" />
					<div class="profile__status"></div>
				</div>
			</div>
		</section>
	</header>
	<main class="main">
		<KeepAlive>
			<component
				@update-weight="updateWeight"
				@open-popup="id => togglePopup(id)"
				:is="sections[sectionId].content"
				:default-profile-image="userDetails.profileImage"
				:load-user-data="loadUserData"
				:user-details="userDetails"
				:toggle-app-theme="toggleAppTheme"
				:colors="colors"
				:add-weight-to-history="addWeightToHistory"
				:get-weight-from-history="getWeightFromHistory"
				:user-previous-data="userPreviousData"
			/>
		</KeepAlive>
	</main>
	<Menu :sections-data="sectionsData" :sections="sections" @change-section="id => (sectionId = id)" />
	<ProfileInfoPopup :popups="popups" :toggle-popup="togglePopup" :add-weight-to-history="addWeightToHistory" :user-details="userDetails" />
	<UpdateWeightPopup :popups="popups" :toggle-popup="togglePopup" :add-weight-to-history="addWeightToHistory" :user-details="userDetails" />
</template>

<style scoped></style>
