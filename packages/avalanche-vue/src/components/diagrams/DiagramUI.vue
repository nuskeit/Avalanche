<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue';
import {
    DiagramPresenter, isUndefOrNull, I_Diagram, I_DraggableWrapper,
    I_Element, I_Vector, Nullable, travelStep
} from "../../../../avalanche-core";

import Connection from '../connectors/Connection.vue';
import NavigationControl from '../controls/NavigationControl.vue';
import ElementEditor from '../editors/element/ElementEditor.vue';
import ElementUI from '../elements/ElementUI.vue';
import DiagramToolbox from './DiagramToolbox.vue';

console.log('qweqeqweqwe');

const { modelValue } = defineProps<{
    modelValue: I_Diagram
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', diagram: I_Diagram): void
}>()

const diagram = computed<I_Diagram>({
    get: (): I_Diagram => modelValue,
    set: (value: I_Diagram) => emit('update:modelValue', { ...value })
})

//Drag elements
const dragPanelRef = ref<any>(null)
const svgPoint = ref<any>(null)
function createSvgPoint() {
    if (!isUndefOrNull(dragPanelRef.value))
        svgPoint.value = dragPanelRef.value.createSVGPoint();
    else
        throw  new Error("createSvgPoint, svgPoint.value is undefined or null")
}
function toLocalVector(clientX: number, clientY: number): I_Vector {
    svgPoint.value.x = clientX; svgPoint.value.y = clientY;
    return svgPoint.value.matrixTransform(dragPanelRef.value.getScreenCTM().inverse());
}

const presenter = reactive<DiagramPresenter>(
    new DiagramPresenter(diagram.value, toLocalVector))

onMounted(() => {
    createSvgPoint()
    dragPanelRef.value.focus()
})


const startDraggingElementHandler = (se: I_DraggableWrapper<I_Element>) => {
    presenter.startDraggingElement(se)
}


const diagramPointerDownHandler = (e: PointerEvent) => {
    presenter.detectDraggingMode(e)
}


const cancelDragHandler = (e: PointerEvent) => {
    presenter.cancelDrag()
}


const updateDragHandler = (e: PointerEvent) => {
    presenter.updateDrag(e)
}



let elementEditorVisible = ref<boolean>(false);
let selectedElement = ref<Nullable<I_Element>>(null);

const selectElementHandler = (element: Nullable<I_Element>) => {
    selectedElement.value = element
}

const openElementEditorHandler = (element: Nullable<I_Element>) => {
    elementEditorVisible.value = true
    //    selectedElement.value = element
}

const closeElementEditorHandler = (e: any) => {
    elementEditorVisible.value = false
    //    selectedElement.value = null
}


function navigateHandler(v: I_Vector) {
    let newV = { x: v.x * travelStep, y: v.y * travelStep }
    presenter.keyboardNavigation(newV)
}

function stopNavigatingHandler() {
    presenter.quitKeyboardInteraction()
}

const handleKeyDown = (e: KeyboardEvent) => {
    presenter.keyboardInteraction(e)
}

</script>

<template>
    <div class="diagram-root">
        <svg preserveAspectRatio="xMidYMid meet"
            :viewBox="`${presenter.viewBox.x} ${presenter.viewBox.y} ${presenter.viewBox.width} ${presenter.viewBox.height}`"
            xmlns="http://www.w3.org/2000/svg" ref="dragPanelRef"
            :class="`diagram checkers-${diagram.diagramType.toLocaleLowerCase()} ${presenter.draggingDynamicClassName}`"
            @focus="" @pointerdown="diagramPointerDownHandler" @pointerup="cancelDragHandler"
            @pointermove="updateDragHandler" @keydown="handleKeyDown" @pointerleave="cancelDragHandler"
            @pointercancel="cancelDragHandler"
            :style="{ backgroundPosition: `${-presenter.viewBox.x * 1.266 + 5} ${-presenter.viewBox.y * 1.266 + 155}` }">

            <g>
                <circle cx="0" cy="0" r="15" class="origin-cross-circle" />
                <line x1="-30" x2="30" class="origin-cross-line" />
                <line y1="-30" y2="30" class="origin-cross-line" />
            </g>

            <template v-for="elem in diagram.elements" :key="elem.element.key">
                <ElementUI v-model="diagram.elements[elem.element.key]" :selected="true"
                    @open-crud="() => openElementEditorHandler(diagram.rootElements[elem.element.key])"
                    @drag-start="startDraggingElementHandler" @select-element="selectElementHandler" />

                <template v-for="rel in elem.element.getOutboundRelations(diagram.relationshipsStore)">
                    <Connection
                        v-if="diagram.elements[rel.sourceKey] != undefined && diagram.elements[rel.targetKey] != undefined"
                        :source-element="diagram.elements[rel.sourceKey]"
                        :target-element="diagram.elements[rel.targetKey]" :rel="rel" />
                </template>
            </template>

        </svg>
        <ElementEditor v-if="elementEditorVisible && selectedElement != null" @close="closeElementEditorHandler"
            v-model="selectedElement" />

        <NavigationControl @navigate="navigateHandler" @stop-navigating="stopNavigatingHandler"
            :keyboardNavFlag="presenter.keyboardNavFlag" :navFlag="presenter.keyboardNavFlag" />

        <DiagramToolbox v-model="diagram" :x="10" :y="10" />
    </div>
</template>

<style scoped lang="scss">
@use '../../styles/diagram.scss';

.origin-cross {
    stroke-width: .05em;
    fill: none;
    stroke: #e5f;
    filter: drop-shadow(.05em .05em .03em rgb(0 0 0 / 1));
    stroke-linecap: round
}

.origin-cross-circle {
    @extend .origin-cross;
    stroke-dasharray: 23.5;
    stroke-dashoffset: 0;
}

.origin-cross-line {
    @extend .origin-cross;
    stroke-dasharray: 15 2 11 4 11 2 15;
}

.diagram-root {
    flex: 1 0 auto;
    display: flex;
    flex-direction: row;
    position: absolute;
    // border: solid 1px blue;
    // box-sizing: border-box;
    height: 100%;
    width: 100%;
    background-color: purple;

    svg {
        //        position:fixed; top:0; bottom:0; left:0; right:0 ;
        // outline: solid 1px red;

        &:focus {
            outline: solid 1px lime;
            text-decoration: none;
        }

        font-size: 2em;

        //    position: relative;
        left: 0;
        right: 0;
        //      top: 75px;
        bottom: 50px;
        width: 100%;
        //        height: calc(100% - 76px);
    }

    // svg.diagram {
    //     flex: 1 1 100em;
    //     // width: 100%;
    //     // height: 95%;
    //     background-attachment: fixed;
    // }

    svg.dragging {
        cursor: grabbing
    }

    // svg.checkers-block {
    //     @extend .checkers-block;
    // }

    // svg.checkers-class {
    //     @extend .checkers-class;
    // }

    // svg.checkers-component {
    //     @extend .checkers-component;
    // }
}
</style>