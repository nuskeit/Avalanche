<script setup lang="ts">
import { I_Element } from '../../core/avalanche-app/root-diagram/diagram/element/domain';
import { I_Draggable } from '../../core/drag/domain';
import { I_Vector } from '../../core/general/domain';
import * as constantsNS from '../../core/general/domain/constants';
import InboundPort from './InboundPort.vue';
import OutboundPort from './OutboundPort.vue';
import { useConnectingPaths } from './useConnectingPaths';

const props = defineProps<{
	draggableElement: I_Draggable<I_Element>
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

// function openEditorHandler(e: any) {
//     emit('open-crud')
// }

function selectHandler(e: any) {
	emit('select-element', props.draggableElement.element)
	//emit('open-crud')
}

</script>

<template>
	<g :transform="`translate(${draggableElement.location.x},${draggableElement.location.y})`"
		class="element-root" @pointerdown.prevent.stop="startDragHandler">

		<rect x="-1" y="-1" :width="constantsNS.elementWidth + 2"
			:height="constantsNS.rowHeight + 2 + constantsNS.rowHeight * draggableElement.element.fields.length" rx="1"
			ry="1" class="element-root-body" />

		<rect x="0" y="0" :width="constantsNS.elementWidth"
			:height="constantsNS.rowHeight + constantsNS.rowHeight * draggableElement.element.fields.length" rx="1"
			ry="1" :class="`element-root-inner-body ${draggableElement.element.elementType}`" />

		<rect x="0" y="0" rx="1" ry="1"
			:class="`element-root-header-body header-${draggableElement.element.elementType}`"
			:width="constantsNS.elementWidth" :height="constantsNS.rowHeight" />

		<text x="3" y="11" class="element-root-header-text" @pointerdown.prevent.stop="startDragHandler"> {{
		`${draggableElement.element.name}`
		}}
		</text>

		<InboundPort @pointerdown="handleInLineStart" @pointerup="handleInLineEnd" :dx="-1.2" />
		<OutboundPort @pointerdown="handleOutLineStart" @pointerup="handleOutLineEnd" :dx="1.2" />

		<text x="3" y="-4">
			<tspan class="element-type">{{ `[${draggableElement.element.elementType}]` }}</tspan>
		</text>

		<slot></slot>

		<rect x="0" y="0" :width="constantsNS.elementWidth"
			:height="constantsNS.rowHeight + constantsNS.rowHeight * draggableElement.element.fields.length" rx="1"
			ry="1" :class="`${selected ? 'selected' : ''} `" />
	</g>

</template>

<style scoped lang="scss">
.element-root {
	fill: none;
	overflow: hidden;

	&>text {
		fill: white;
		font-size: .6rem;
	}

	.selected {
		stroke: #0f0;
		stroke-width: 1.5;
	}
}


.element-root-header-body {
	fill: #222;
	stroke: none;
	cursor: pointer;
}

.element-root-header-text {
	cursor: pointer;
	font-size: 20rem;
}

.element-type {
	font-size: .5rem;
}

.element-root-body {
	stroke-width: 1;
	filter: drop-shadow(4px 4px 1.5px rgb(0 0 0 / .5));
	stroke: #aaa;
	fill: rgba(#777, .5);

}

.element-root-inner-body {
	//fill: #445;
	stroke-width: 1;
	stroke: #333;
	fill: rgba(#000, 1);

}


$elem-opacity: .2;

.Block {
	fill: rgba(#337, $elem-opacity);
}

.Component {
	fill: rgba(#a5a, $elem-opacity);
}

.Class {
	fill: rgba(#f75, $elem-opacity);
}

.Interface {
	fill: rgba(#aa5, $elem-opacity);
	stroke-dasharray: 4 2;
	stroke-width: 1;
	//    stroke: purple;
}

.header-Interface {
	fill: rgba(#aaa, $elem-opacity);
}

.Enum {
	fill: rgba(#55a, $elem-opacity);
}

// .Block {
//   //fill: red
// }
</style>
