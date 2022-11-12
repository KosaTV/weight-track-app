<script setup>
import {reactive} from "vue";
import Box from "./Box.vue";

const emit = defineEmits(["toggle"]);
const props = defineProps(["toggle"]);

const data = reactive({toggled: false});

const toggle = e => {
	if (!props.toggle && data.toggled) {
		e.stopPropagation();
		data.toggled = !data.toggled;
		emit("toggle", data);
		return;
	}
};
</script>
<template>
	<div class="toggler" :class="{'toggler--toggled': props.toggle ? props.toggle : data.toggled}" @click="toggle">
		<div class="toggler__field"></div>
		<div class="toggler__zip"></div>
	</div>
</template>
<style scoped></style>
