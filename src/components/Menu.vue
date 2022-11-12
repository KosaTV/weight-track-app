<script setup>
import MenuItem from "./MenuItem.vue";
const props = defineProps({sectionsData: Array, sections: Array});
const emit = defineEmits(["changeSection"]);

const switchSection = e => {
	const tab = e.target;
	if (tab.dataset.active) return;
	const text = tab.closest(".menu-item-link").querySelector(".menu-item__text").innerText;
	props.sectionsData.map(item => (item.active = false));
	props.sectionsData.some(item => {
		if (!item.active && item.text === text) {
			item.active = true;
			return true;
		}
		return;
	});
	emit("changeSection", getSectionId(text));
};

const getSectionId = text => {
	const section = props.sections.find(section => {
		return section.content.__name.includes(text);
	});
	return section.id;
};
</script>
<template>
	<nav class="nav">
		<ol class="menu">
			<MenuItem
				@click="switchSection"
				v-for="(item, index) in props.sectionsData"
				:key="item.text + index"
				:text="item.text"
				:icon="item.icon"
				:active="item.active"
				:data-set-active="item.active"
			/>
		</ol>
	</nav>
</template>
<style scoped></style>
