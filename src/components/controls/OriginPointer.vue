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

const visible = computed<boolean>(() => {
	if (props.originX > 0 || props.originX < -1280 ||
		props.originY > 0 || props.originY < -720 )
		return true
	else
		return false
})

</script>
<template>
	<g :transform="`translate(${props.x} ${props.y})`" v-show="visible">
		<g :transform="`rotate(${direction}) scale(.5)`">
			<polygon class="arrow-shake" points="0,0 50,-50 50,-25 100,-25 100,25 50,25 50,50" fill="#5053" />
		</g>
	</g>
</template>

<style lang="scss" scoped>
.arrow-shake {
	animation: shake 5s normal;
	animation-iteration-count: infinite;
	animation-timing-function: linear;
	animation-play-state: running;
}

@keyframes shake {
	0% {
		transform: translateX(0px);
	}

	84% {
		fill: #5053;
	}

	85% {
		transform: translateX(0px);
	}

	87% {
		fill: #5056;
		transform: translateX(-30px);
	}

	89% {
		transform: translateX(0px);
	}

	91% {
		transform: translateX(-30px);
	}

	93% {
		transform: translateX(0px);
	}

	95% {
		fill: #5056;
		transform: translateX(-30px);
	}

	97% {
		transform: translateX(0px);
	}

	100% {
		fill: #5053;
	}
}
</style>