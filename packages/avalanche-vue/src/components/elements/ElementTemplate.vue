<script setup lang="ts">
import { elementWidth, I_DraggableWrapper, I_Element, rowHeight } from '../../../../avalanche-core';
import InboundPort from './InboundPort.vue';
import OutboundPort from './OutboundPort.vue';
import { useConnectingPaths } from './useConnectingPaths';

const { draggableElement } = defineProps<{
    draggableElement: I_DraggableWrapper<I_Element>
}>();

const emit = defineEmits<{
    (e: 'open-crud'): void
    (e: 'select-element', dragObj: I_Element): void
    (e: 'drag-start', dragObj: I_DraggableWrapper<I_Element>): void
}>()


const {
    handleInLineStart,
    handleInLineEnd,
    handleOutLineStart,
    handleOutLineEnd
} = useConnectingPaths()

function startDragHandler(e: any) {
    draggableElement.dragger.mouseLocation.x = e.clientX
    draggableElement.dragger.mouseLocation.y = e.clientY
    emit('drag-start', draggableElement)
}

function openEditorHandler(e: any) {
    emit('open-crud')
}

function selectHandler(e: any) {
    emit('select-element', draggableElement.element)
}

</script>

<template>
    <g :transform="`translate(${draggableElement.dragger.location.x},${draggableElement.dragger.location.y})`"
        class="element-root">

        <rect x="-1" y="-1" :width="elementWidth + 2"
            :height="rowHeight + 2 + rowHeight * draggableElement.element.fields.length" rx="1" ry="1"
            class="element-root-body" />

        <rect x="0" y="0" :width="elementWidth" :height="rowHeight + rowHeight * draggableElement.element.fields.length"
            rx="1" ry="1" :class="`element-root-inner-body ${draggableElement.element.elementType}`" />

        <rect x="0" y="0" rx="1" ry="1"
            :class="`element-root-header-body header-${draggableElement.element.elementType}`"
            @pointerdown.prevent="startDragHandler" :width="elementWidth" :height="rowHeight"
            @dblclick.prevent="openEditorHandler" @click.prevent="selectHandler" />

        <text x="3" y="11" class="element-root-header-text" @pointerdown.prevent="startDragHandler"
            @dblclick.prevent="openEditorHandler" @click.prevent="selectHandler"> {{ `${draggableElement.element.name}`
            }}
        </text>

        <!-- <polygon points="-6,0 0,-6 6,0 0,6" class="inPort" @pointerdown="handleInLineStart" @pointerup="handleInLineEnd" />
    <circle :cx="elementWidth+5" cy="0" r="5" class="outPort" @pointerdown="handleOutLineStart" @pointerup="handleOutLineEnd" /> -->
        <InboundPort @pointerdown="handleInLineStart" @pointerup="handleInLineEnd" :dx="-1.2" />
        <OutboundPort @pointerdown="handleOutLineStart" @pointerup="handleOutLineEnd" :dx="1.2" />


        <text x="3" y="-4">
            <tspan class="element-type">{{ `[${draggableElement.element.elementType}]` }}</tspan>
        </text>
        <slot></slot>
    </g>

</template>

<style scoped lang="scss">
@import "./element.scss";

// .Block {
//   //fill: red
// }
</style>
