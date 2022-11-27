<script setup>
import Menu from "../src/components/Menu.vue";
import {setApplicationSize} from "../src/helpers/configFns";
import {default as dateHelper} from "../src/helpers/date";
import AboutPopup from "../src/components/AboutPopup.vue";
import ProfileInfoPopup from "../src/components/ProfileInfoPopup.vue";
import UpdateWeightPopup from "../src/components/UpdateWeightPopup.vue";
import HomeSection from "../src/components/HomeSection.vue";
import HistorySection from "../src/components/HistorySection.vue";
import SettingsSection from "../src/components/SettingsSection.vue";
import ProfileSection from "../src/components/ProfileSection.vue";
import {reactive, markRaw, ref, onBeforeMount, watch} from "vue";

const sectionId = reactive({current: 0, previous: 0});
const userPreviousData = ref(localStorage.getItem("userDetails"));
const fullScreenContentMode = ref(false);

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
	weightHistory: {}
});

const switchSection = id => {
	sectionId.previous = sectionId.current;
	sectionId.current = id;
};

const togglePopup = (name, options = {}) => {
	if (options) popups[name].options = options;
	popups[name].opened = !popups[name].opened;
};

const addUserDataToStorage = () => {
	localStorage.setItem("userDetails", JSON.stringify(userDetails));
};

const loadUserData = () => {
	if (userPreviousData.value) {
		const userPreviousDataObject = JSON.parse(userPreviousData.value);
		Object.entries(userPreviousDataObject).forEach(([property, value]) => {
			userDetails[property] = userPreviousDataObject[property];
		});
	}
};

const getLastWeightFromHistory = () => {
	const years = Object.keys(userDetails.weightHistory);
	const lastYear = years[years.length - 1];
	const months = Object.keys(userDetails.weightHistory[lastYear]);
	const lastMonth = months[months.length - 1];
	const days = Object.keys(userDetails.weightHistory[lastYear][lastMonth]);
	const lastDay = days[days.length - 1];

	const latestWeight = userDetails.weightHistory[lastYear]?.[lastMonth]?.[lastDay];
	return latestWeight.weight;
};

const popups = reactive({
	updateWeightPopup: {
		opened: false,
		options: {},
		onOpen: () => {},
		onClose: () => {}
	},
	profileInfoPopup: {opened: !userPreviousData.value, options: {}, onOpen: () => {}, onClose: () => {}},
	aboutAppPopup: {opened: false, options: {}, onOpen: () => {}, onClose: () => {}},
	confirmPopup: {opened: false, options: {}, onOpen: () => {}, onClose: () => {}}
});

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
	{icon: `<ion-icon name="home"></ion-icon>`, text: "Home", active: true},
	{icon: `<ion-icon name="calendar-clear"></ion-icon>`, text: "History", active: false},
	{icon: `<ion-icon name="settings"></ion-icon>`, text: "Settings", active: false}
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
	setApplicationSize();
	initConfiguration();
});

watch(userDetails, () => {
	addUserDataToStorage();
	userDetails.darkTheme ? setDarkTheme() : setWhiteTheme();
	userDetails.currentWeight = getLastWeightFromHistory();
});

watch(sectionId, () => {
	fullScreenContentMode.value = sectionId.current === 3;
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

const sortWeightHistory = () => {
	Object.keys(userDetails.weightHistory).sort((yearA, yearB) => {
		return yearA - yearB;
	});

	const years = Object.keys(userDetails.weightHistory);
	const lastYear = years[years.length - 1];

	Object.keys(userDetails.weightHistory[lastYear]).sort((monthA, monthB) => {
		return monthA - monthB;
	});

	const months = Object.keys(userDetails.weightHistory[years[years.length - 1]]);
	const lastMonth = months[months.length - 1];

	Object.keys(userDetails.weightHistory[lastYear][lastMonth]).sort((dayA, dayB) => {
		return dayA - dayB;
	});
};

const addWeightToHistory = (weight, date = new Date(), unit = "kg") => {
	const {year, month, day} = dateHelper.getDateDetails(date);
	getStoragePlaceForDate(year, month, day);
	userDetails.weightHistory[year][month][day] = {weight, unit};
	sortWeightHistory();
	if (day === new Date().getDate()) updateWeight();
};

const removeWeightFromHistory = date => {
	const {year, month, day} = dateHelper.getDateDetails(date);
	delete userDetails.weightHistory[year][month][day];
};
</script>

<template>
	<header class="app-header" v-show="!fullScreenContentMode">
		<section class="section">
			<h5 class="section__header section__header--secondary">Overview</h5>
			<h1 class="section__header section__header--main">{{ sections[sectionId.current].name }}</h1>
		</section>
		<section class="profile" @click="() => switchSection(3)">
			<div class="img-section">
				<div class="profile-cnt">
					<img :src="userDetails.profileImage" alt="profile" class="profile__img" />
					<div class="profile__status"></div>
				</div>
			</div>
		</section>
	</header>
	<main class="main" :style="[`padding-bottom: ${fullScreenContentMode ? '0' : ''}`]">
		<KeepAlive>
			<component
				@update-weight="updateWeight"
				@open-popup="id => togglePopup(id)"
				:is="sections[sectionId.current].content"
				:default-profile-image="userDetails.profileImage"
				:load-user-data="loadUserData"
				:user-details="userDetails"
				:toggle-app-theme="toggleAppTheme"
				:colors="colors"
				:add-weight-to-history="addWeightToHistory"
				:get-last-weight-from-history="getLastWeightFromHistory"
				:remove-weight-from-history="removeWeightFromHistory"
				:get-weight-from-history="getWeightFromHistory"
				:user-previous-data="userPreviousData"
				:toggle-popup="togglePopup"
				:switch-section="switchSection"
				:section-id="sectionId"
				:popups="popups"
			/>
		</KeepAlive>
	</main>
	<Menu :sections-data="sectionsData" :sections="sections" @change-section="id => switchSection(id)" v-show="!fullScreenContentMode" />
	<ProfileInfoPopup
		:popups="popups"
		:toggle-popup="togglePopup"
		:add-weight-to-history="addWeightToHistory"
		:user-details="userDetails"
		:user-previous-data="userPreviousData"
	/>
	<UpdateWeightPopup :popups="popups" :toggle-popup="togglePopup" :add-weight-to-history="addWeightToHistory" :user-details="userDetails" />
	<AboutPopup :popups="popups" :toggle-popup="togglePopup" />
</template>

<style scoped></style>
