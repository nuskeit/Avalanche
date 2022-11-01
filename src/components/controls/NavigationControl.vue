<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { I_Vector } from '../../core/general/domain';
import ArrowButton from './NavigationArrow.vue';
import { NavigationControlPresenter } from './navigation-control-presenter';

const props = defineProps<{
	navFlag: boolean
	x: number
	y: number
}>()

const emit = defineEmits<{
	(e: "navigate", payload: I_Vector): void
	(e: "stop-navigating"): void
}>()
const naigationDelegate = (direction: I_Vector) => emit("navigate", direction)
const navControlPresenter: NavigationControlPresenter = reactive<NavigationControlPresenter>(new NavigationControlPresenter(naigationDelegate))

</script>

<template>
	<g :transform="`translate(${x}, ${y})`">

		<ArrowButton :x="0" :y="0" :sideSize="navControlPresenter.sideSize" :direction="-45" :pressed="props.navFlag"
			@start-nav="navControlPresenter.eventsHandler.emitUL" @stop-nav="emit('stop-navigating')" />

		<ArrowButton :x="navControlPresenter.sideSize + 2" :y="0" :sideSize="navControlPresenter.sideSize"
			:direction="0" :pressed="props.navFlag" @start-nav="navControlPresenter.eventsHandler.emitU"
			@stop-nav="emit('stop-navigating')" />

		<ArrowButton :x="navControlPresenter.sideSize * 2 + 4" :y="0" :sideSize="navControlPresenter.sideSize"
			:direction="45" :pressed="props.navFlag" @start-nav="navControlPresenter.eventsHandler.emitUR"
			@stop-nav="emit('stop-navigating')" />


		<ArrowButton :x="0" :y="navControlPresenter.sideSize + 2" :sideSize="navControlPresenter.sideSize"
			:direction="-90" :pressed="props.navFlag" @start-nav="navControlPresenter.eventsHandler.emitL"
			@stop-nav="emit('stop-navigating')" />

		<ArrowButton :x="navControlPresenter.sideSize + 2" :y="navControlPresenter.sideSize + 2"
			:sideSize="navControlPresenter.sideSize" :direction="null" :pressed="props.navFlag"
			@start-nav="navControlPresenter.eventsHandler.emitC" @stop-nav="emit('stop-navigating')" />

		<ArrowButton :x="navControlPresenter.sideSize * 2 + 4" :y="navControlPresenter.sideSize + 2"
			:sideSize="navControlPresenter.sideSize" :direction="90" :pressed="props.navFlag"
			@start-nav="navControlPresenter.eventsHandler.emitR" @stop-nav="emit('stop-navigating')" />


		<ArrowButton :x="0" :y="navControlPresenter.sideSize * 2 + 4" :sideSize="navControlPresenter.sideSize"
			:direction="-135" :pressed="props.navFlag" @start-nav="navControlPresenter.eventsHandler.emitDL"
			@stop-nav="emit('stop-navigating')" />

		<ArrowButton :x="navControlPresenter.sideSize + 2" :y="navControlPresenter.sideSize * 2 + 4"
			:sideSize="navControlPresenter.sideSize" :direction="180" :pressed="props.navFlag"
			@start-nav="navControlPresenter.eventsHandler.emitD" @stop-nav="emit('stop-navigating')" />

		<ArrowButton :x="navControlPresenter.sideSize * 2 + 4" :y="navControlPresenter.sideSize * 2 + 4"
			:sideSize="navControlPresenter.sideSize" :direction="135" :pressed="props.navFlag"
			@start-nav="navControlPresenter.eventsHandler.emitDR" @stop-nav="emit('stop-navigating')" />

	</g>
</template>
