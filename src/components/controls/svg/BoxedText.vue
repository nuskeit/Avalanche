<script lang="ts" setup>
import { computed } from 'vue';
import { isUndefOrNull } from '../../../core/general/domain';

const props = defineProps<{
	x: number
	y: number
	width: number
	height: number
	fill: string
	color: string
	text: string
	verticalTrim?: number
}>()

const emit = defineEmits<{
	(e: "click"): void
}>()

const middle = computed<number>(() => {
	if (!isUndefOrNull(props.verticalTrim))
		// @ts-ignore props.verticalTrim is not undefined
		return props.y + props.height / 2 + props.verticalTrim
	return props.y + props.height / 2
})

function clickHandler() {
	emit('click')
}

</script>
<template>
	<rect class="hand" @pointerdown.stop="" @click.stop="clickHandler" :x="props.x" :y="props.y" :width="props.width" :height="props.height"
		:fill="props.fill" />
	<text class="hand" @pointerdown.stop="" @click.stop="clickHandler" style="font-size: 18;" :x="props.x + 4" :y="middle" :width="props.width" :height="props.height"
		:fill="props.color">{{ props.text }}</text>
</template>

<style lang="scss">
.hand {
	cursor: pointer;
}
</style>