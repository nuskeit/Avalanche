<script setup lang="ts">
import { computed } from '@vue/reactivity';
import { I_Element } from '../../core/avalanche-app/root-diagram/diagram/element/domain';
import { I_Draggable } from '../../core/drag/domain';
import { I_DraggableElement } from '../../core/drag/domain/draggable-element';
import { I_Vector } from '../../core/general/domain';
import * as constantsNS from '../../core/general/domain/constants';
import InboundPort from './InboundPort.vue';
import OutboundPort from './OutboundPort.vue';
import { useConnectingPaths } from './useConnectingPaths';

const props = defineProps<{
	draggableElement: I_DraggableElement
	selected: boolean
}>();

const emit = defineEmits<{
	(e: 'open-crud'): void
	(e: 'select-element', dragObj: I_Element): void
	(e: 'drag-start', dragObj: I_Draggable<I_Element>, mouseLocation: I_Vector): void
}>()

const {
	handleInLineStart,
	handleInLineEnd,
	handleOutLineStart,
	handleOutLineEnd
} = useConnectingPaths()

function startDragHandler(e: any) {
	emit('drag-start', props.draggableElement, { x: e.clientX, y: e.clientY })
	emit('select-element', props.draggableElement.element)
}

// const height = computed<number>(() => {
// 	return constantsNS.rowHeight + 2 + constantsNS.rowHeight * props.draggableElement.element.fields.length
// })

// function openEditorHandler(e: any) {
//     emit('open-crud')
// }

function selectHandler(e: any) {
	emit('select-element', props.draggableElement.element)
	//emit('open-crud')
}

</script>

<template>
	<g :transform="`translate(${draggableElement.location.x},${draggableElement.location.y})`" class="element-template"
		@pointerdown.prevent.stop="startDragHandler">

		<rect x="-1" y="-1" :width="draggableElement.size.width + 2" :height="draggableElement.heightAuto" rx="1" ry="1"
			class="element-template-body" />

		<rect x="0" y="0" :width="draggableElement.size.width"
			:height="draggableElement.heightAuto" rx="1"
			ry="1" :class="`element-template-inner-body ${draggableElement.element.elementType}`" />

		<rect x="0" y="0" rx="1" ry="1"
			:class="`element-template-header-body header-${draggableElement.element.elementType}`"
			:width="draggableElement.size.width" :height="constantsNS.rowHeight" />

		<text x="3" y="11" class="element-template-header-text" @pointerdown.prevent.stop="startDragHandler"> {{
				`${draggableElement.element.name}`
		}}
		</text>

		<InboundPort @pointerdown="handleInLineStart" @pointerup="handleInLineEnd" :dx="-1.2" />
		<OutboundPort @pointerdown="handleOutLineStart" @pointerup="handleOutLineEnd" :x="props.draggableElement.size.width + 20" />

		<text x="3" y="-4">
			<tspan class="element-type">{{ `[${draggableElement.element.elementType}]` }}</tspan>
		</text>

		<slot></slot>

		<rect x="0" y="0" :width="draggableElement.size.width"
			:height="constantsNS.rowHeight + constantsNS.rowHeight * draggableElement.element.fields.length" rx="1"
			ry="1" :class="`${selected ? 'selected' : ''} `" />
	</g>

</template>

<style scoped lang="scss">
</style>
