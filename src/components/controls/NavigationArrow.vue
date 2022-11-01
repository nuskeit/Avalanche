<script lang="ts" setup>
import { ref } from 'vue';

const props = defineProps<{
	x: number
	y: number
	sideSize: number
	direction: number | null
}>()

const emit = defineEmits<{
	(e: "startNav"): void
	(e: "stopNav"): void
}>()

const pressed = ref<boolean>(false)

function pointerDownHandler() {
	pressed.value = true
	emit('startNav')
}

function pointerUpHandler() {
	pressed.value = false
	emit('stopNav')
}
</script>

<template>
	<g class="navigation-.navigation-arrow">
		<g class="navigation-button" @pointermove.stop="" @pointerdown.stop="pointerDownHandler"
			@pointerup="pointerUpHandler" @pointerout="pointerUpHandler"
			:transform="`translate(${props.x} ${props.y})`">
			<polygon :class="`arrow ul ${pressed ? ' pressed ' : ''}`" v-if="direction == null ? false : true"
				:transform="`rotate(${direction})`" :transform-origin="`0 ${sideSize / 2}`"
				:points="`0,0 -${sideSize / 2},${sideSize / 2} -${sideSize / 4},${sideSize / 2} -${sideSize / 4},${sideSize} ${sideSize / 4},${sideSize} ${sideSize / 4},${sideSize / 2} ${sideSize / 2},${sideSize / 2}`"
				fill="#5053" />
			<circle :class="`arrow ul ${pressed ? ' pressed ' : ''}`" v-if="direction == null ? true : false"
				:cy="`${sideSize / 2}`" r="25" />
		</g>
	</g>
</template>
