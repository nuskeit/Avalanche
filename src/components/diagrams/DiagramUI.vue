<script lang="ts" setup>
import { inject, onMounted, onUnmounted, reactive, ref } from 'vue';
import { AvalancheApp } from '../../core/avalanche-app/application';

import { Diagram } from '../../core/avalanche-app/root-diagram/diagram/application';
import { I_Diagram } from '../../core/avalanche-app/root-diagram/diagram/domain';
import { isUndefOrNull } from '../../core/general/domain';
import { Throttle } from '../../core/general/presenter';
import Connection from '../connectors/Connection.vue';
import NavigationControl from '../controls/NavigationControl.vue';
import OriginPointer from '../controls/OriginPointer.vue';
import ElementEditor from '../editors/element/ElementEditor.vue';
import ElementUI from '../elements/ElementUI.vue';
import { DiagramPresenter } from './diagram-presenter';
import DiagramOrigin from './DiagramOrigin.vue';
import DiagramToolbox from './DiagramToolbox.vue';
import GridUI from './GridUI.vue';

const props = defineProps<{
	modelValue: I_Diagram
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', diagram: I_Diagram): void
}>()

const avalancheApp = inject("avalanche-app") as AvalancheApp

// const diagram = computed<I_Diagram>({
// 	get: (): I_Diagram => props.modelValue,
// 	set: (value: I_Diagram) => emit('update:modelValue', { ...value })
// })

const diagramLocal = new Diagram(props.modelValue.name, props.modelValue.diagramType,
	props.modelValue.elementsStore, props.modelValue.relationshipsStore,
	props.modelValue.viewBox, props.modelValue.viewPort)
Object.assign(diagramLocal, props.modelValue)


const t = new Throttle()


//Drag elements
const diagramSvg = ref<any>(null)
const svgPoint = ref<any>(null)

function createSvgPoint() {
	if (!isUndefOrNull(diagramSvg.value))
		svgPoint.value = diagramSvg.value.createSVGPoint();
	else
		throw new Error("createSvgPoint, svgPoint.value is undefined or null")
}

const presenter = reactive<DiagramPresenter>(
	new DiagramPresenter(
		avalancheApp.generalFactory,
		() => presenter,
		diagramLocal,
		() => diagramSvg.value,
		() => svgPoint.value))

onMounted(async () => {
	createSvgPoint()

	const afn = async () => {
		setTimeout(() => presenter.diagram.viewPort.width = diagramSvg.value.width.animVal.value, 10)
		setTimeout(() => presenter.diagram.viewPort.height = diagramSvg.value.height.animVal.value, 10)
	}
	await afn()

	diagramSvg.value.focus()

	window.addEventListener("resize", () => t.throttle(() => presenter.updateViewportSize(), 50))
})

onUnmounted(async () => {
	window.removeEventListener("resize", () => t.throttle(() => presenter.updateViewportSize(), 50))
})


</script>

<template>
	<!-- <div v-if="crudVisible" style="color:white">AAAAAAAAAAAAAA</div> -->
	<div class="diagram-root">
		<svg preserveAspectRatio="xMinYMin meet"
			:viewBox="`${presenter.diagram.viewBox.x} ${presenter.diagram.viewBox.y} ${presenter.diagram.viewBox.width} ${presenter.diagram.viewBox.height}`"
			xmlns="http://www.w3.org/2000/svg" ref="diagramSvg"
			:class="`checkers-${presenter.diagram.diagramType.toLocaleLowerCase()} ${presenter.draggingDynamicClassName}`"
			@focus="" @pointerdown="presenter.eventsHandler.diagramPointerDownHandler"
			@pointerup="presenter.eventsHandler.cancelDragHandler"
			@pointermove="presenter.eventsHandler.updateDragHandler"
			@pointerleave="presenter.eventsHandler.cancelDragHandler"
			@pointercancel="presenter.eventsHandler.cancelDragHandler" @keydown="presenter.eventsHandler.handleKeyDown">

			<!-- <GridUI :grid="new Grid(presenter.diagram.viewBox,presenter.diagram.viewPort)" /> -->
			<GridUI :grid="presenter.grid" />

			<DiagramOrigin />

			<rect :x="presenter.diagram.viewBox.x" :y="presenter.diagram.viewBox.y"
				:width="presenter.navigationControlPosition.x" :height="presenter.navigationControlPosition.y"
				fill="#00f8" />

			<!-- @open-crud="() => presenter.eventsHandler.openElementEditorHandler(presenter.diagram.rootElements[elem.element.key])" -->
			<g v-for="elem in presenter.diagram.elements" :key="elem.element.key">
				<ElementUI v-model="presenter.diagram.elements[elem.element.key]"
					:selected="elem.element.key == presenter.selectedElement?.key"
					@drag-start="presenter.eventsHandler.startDraggingElementHandler"
					@select-element="presenter.eventsHandler.selectElementHandler" />

				<g v-for="rel in elem.element.getOutboundRelations(presenter.diagram.relationshipsStore)" :key="rel.key">
					<Connection
						v-if="presenter.diagram.elements[rel.sourceKey] != undefined && presenter.diagram.elements[rel.targetKey] != undefined"
						:source-element="presenter.diagram.elements[rel.sourceKey]"
						:target-element="presenter.diagram.elements[rel.targetKey]" :rel="rel" />
				</g>
			</g>

			<g :transform="`translate(${presenter.diagram.viewBox.x}, ${presenter.diagram.viewBox.y})`">
				<OriginPointer :origin-x="presenter.diagram.viewBox.x" :origin-y="presenter.diagram.viewBox.y" :x="70"
					:y="70" />

				<NavigationControl :x="presenter.navigationControlPosition.x" :y="presenter.navigationControlPosition.y"
					@navigate="presenter.eventsHandler.screenPadNavigationHandler"
					@stop-navigating="presenter.eventsHandler.stopNavigatingHandler"
					:keyboardNavFlag="presenter.keyboardNavFlag" :navFlag="presenter.keyboardNavFlag" />

				<DiagramToolbox v-model="presenter.diagram" :x="presenter.diagramToolboxPosition.x"
					:y="presenter.diagramToolboxPosition.y" :width="175" />
			</g>
		</svg>
		<div class="left-panel"
			:style="`font-size:${presenter.diagram.viewPort.width / presenter.diagram.viewBox.width}rem`">

			<ElementEditor v-if="presenter.elementEditorVisible"
				@close="presenter.eventsHandler.closeElementEditorHandler" :element="(presenter.editElement as any)"
				@update:element="presenter.eventsHandler.updateElementHandler" />

		</div>
	</div>
</template>

<style scoped lang="scss">
@use '../../styles/diagram.scss';


.diagram-root {
	flex: 1 0 auto;
	display: flex;
	flex-direction: row;
	position: absolute;
	height: 100%;
	width: 100%;
	background-color: purple;

	.left-panel {
		position: absolute;
		left: 2rem;
		top: 2rem;
		// width: 10%;
		//font-size: 15px;
		overflow: auto;
		max-height: 30rem;
	}

	svg {
		&:focus {
			outline: solid 1px lime;
			text-decoration: none;
		}

		font-size: 2em;

		left: 0;
		right: 0;
		bottom: 50px;
		width: 100%;
	}

	svg.dragging {
		cursor: grabbing
	}
}
</style>