<script setup>
import Box from "./Box.vue";
import Toggler from "./Toggler.vue";

const props = defineProps({userInfo: Object});
</script>
<template>
	<div class="tiles-cnt">
		<div class="tiles-cnt__banner tiles-cnt__banner--top tiles-cnt__banner--ease"></div>
		<div class="tiles-cnt__overlay">
			<header class="profile-header">
				<section class="profile profile--in-section">
					<div class="img-section img-section--in-section">
						<div class="profile-cnt">
							<img
								src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
								alt="profile"
								class="profile__img"
							/>
							<div class="profile__status profile__status--in-section"></div>
						</div>
					</div>
				</section>
				<section class="section">
					<h1 class="section__header section__header--main section__header--in-section">{{ userInfo.name }} {{ userInfo.lastName }}</h1>
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
							<span class="profile-info-list__data">{{ userInfo.name }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Last name</span>
							<span class="profile-info-list__data">{{ userInfo.lastName }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Current weight</span>
							<span class="profile-info-list__data">{{ userInfo.currentWeight }} {{ userInfo.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Start weight</span>
							<span class="profile-info-list__data">{{ userInfo.startWeight }} {{ userInfo.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Goal weight</span>
							<span class="profile-info-list__data">{{ userInfo.goalWeight }} {{ userInfo.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">Unit</span>
							<span class="profile-info-list__data">{{ userInfo.unit }}</span>
						</li>
						<li class="profile-info-list__item">
							<span class="profile-info-list__label">BMI</span>
							<span class="profile-info-list__data">{{ userInfo.BMI }}</span>
						</li>
					</ol>
				</template>
			</Box>
			<div class="profile-config-cnt">
				<button class="button">
					<span class="button__icon"> <ion-icon name="create-outline"></ion-icon></span>
					Edit profile
				</button>
			</div>
		</div>
		<div class="tiles-cnt__banner tiles-cnt__banner--bottom tiles-cnt__banner--ease"></div>
	</div>
</template>
<style scoped></style>
