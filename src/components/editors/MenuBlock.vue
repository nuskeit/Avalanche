<script lang="ts" setup>
import exp from 'constants';
import { ref } from 'vue';


const expanded = ref<boolean>(true)

const props = defineProps<{
	title: string
}>()

function toggleHandler() {
	expanded.value = !expanded.value
}

</script>

<template>
	<div class="menu-block">
		<div class="title" @pointerdown="toggleHandler">{{props.title}}</div>
		<div class="body" v-if="expanded">
			<slot></slot>
		</div>
	</div>
</template>

