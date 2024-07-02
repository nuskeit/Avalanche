<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
	originX: number
	originY: number
	x: number
	y: number
}>()

const direction = computed<number>(() => {
	const adj = props.originX + props.x
	const opp = props.originY + props.y
	const ang = Math.atan(opp / adj) * 180 / Math.PI
	return (adj < 0 ? 180 : 0) + ang
})

// const visible = computed<boolean>(() => {
// 	if (props.originX > 0 || props.originX < -1280 ||
// 		props.originY > 0 || props.originY < -720)
// 		return true
// 	else
// 		return false
// })

</script>
<template>
	<g class="origin-pointer" :transform="`translate(${props.x} ${props.y})`">
		<g :transform="`rotate(${direction}) scale(.5)`">
			<polygon class="arrow-shake" points="0,0 50,-50 50,-25 100,-25 100,25 50,25 50,50" fill="#5053" />
		</g>
	</g>
</template>
