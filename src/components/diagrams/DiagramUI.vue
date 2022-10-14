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
import DiagramEditor from '../editors/element/DiagramEditor.vue';
import { AppFactory } from '../../core/factories/app-factory/application';

const props = defineProps<{
	modelValue: I_Diagram
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', diagram: I_Diagram): void
}>()

const avalancheApp = inject("avalanche-app") as AvalancheApp

// const diagramLocal = new Diagram(props.modelValue.name, props.modelValue.diagramType,
// 	props.modelValue.viewBox, props.modelValue.viewPort)
const diagramLocal = AppFactory.getSingleton().createDiagram(props.modelValue.name, props.modelValue.diagramType,
	props.modelValue.viewBox, props.modelValue.viewPort, props.modelValue.key)

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

const presenter: DiagramPresenter = reactive<DiagramPresenter>(
	new DiagramPresenter(
		{
			presenterProxy: () => presenter,
			diagramProxy: () => diagramLocal
		},
		() => diagramSvg.value,
		() => svgPoint.value))

onMounted(async () => {
	createSvgPoint()

	const afn = async () => {
		setTimeout(() => diagramLocal.viewPort.width = diagramSvg.value.width.animVal.value, 10)
		setTimeout(() => diagramLocal.viewPort.height = diagramSvg.value.height.animVal.value, 10)
	}
	await afn()

	diagramSvg.value.focus()
})

</script>

<template>
	<div class="diagram-root">
		<div class="left">{{presenter.draggingDynamicClassName}}
			<svg preserveAspectRatio="xMinYMin slice"
				:viewBox="`${presenter.diagramProxy.viewBox.x} ${presenter.diagramProxy.viewBox.y} ${presenter.diagramProxy.viewBox.width} ${presenter.diagramProxy.viewBox.height}`"
				xmlns="http://www.w3.org/2000/svg" ref="diagramSvg"
				:class="`checkers-${diagramLocal.diagramType.toLocaleLowerCase()} ${presenter.draggingDynamicClassName}`"
				@focus="" @pointerdown="presenter.eventsHandler.diagramPointerDownHandler"
				@pointerup="presenter.eventsHandler.cancelDragHandler"
				@pointermove="presenter.eventsHandler.updateDragHandler"
				@pointerleave="presenter.eventsHandler.cancelDragHandler"
				@pointercancel="presenter.eventsHandler.cancelDragHandler"
				@keydown="presenter.eventsHandler.handleKeyDown">

				<!-- <GridUI :grid="new Grid(diagramLocal.viewBox,diagramLocal.viewPort)" /> -->
				<GridUI :grid="presenter.grid" />

				<DiagramOrigin />

				<rect :x="diagramLocal.viewBox.x" :y="diagramLocal.viewBox.y"
					:width="presenter.navigationControlLocation.x" :height="presenter.navigationControlLocation.y"
					fill="#00f8" />

				<!-- @open-crud="() => presenter.eventsHandler.openElementEditorHandler(diagramLocal.rootElements[elem.element.key])" -->
				<g v-for="elem in diagramLocal.elements" :key="Math.random()">
					<ElementUI v-model="diagramLocal.elements[elem.element.key]"
						:selected="elem.element.key == presenter.selectedElement?.key"
						@drag-start="presenter.eventsHandler.startDraggingElementHandler"
						@select-element="presenter.eventsHandler.selectElementHandler" />

				</g>
				<g v-for="rel in diagramLocal.relationships" :key="'rel'+rel.key">

					<Connection :source-element="diagramLocal.elements[rel.sourceElementKey]"
						:target-element="diagramLocal.elements[rel.targetElementKey]" :rel="rel" />
				</g>

				<g v-for="rel in avalancheApp.rootDiagram.relationshipsStore.relationships" :key="rel.key">
					<Connection
						v-if="diagramLocal.elements[rel.sourceElementKey] != undefined && diagramLocal.elements[rel.targetElementKey] != undefined"
						:source-element="diagramLocal.elements[rel.sourceElementKey]"
						:target-element="diagramLocal.elements[rel.targetElementKey]" :rel="rel" />
				</g>

				<g :transform="`translate(${diagramLocal.viewBox.x}, ${diagramLocal.viewBox.y})`">
					<OriginPointer :origin-x="diagramLocal.viewBox.x" :origin-y="diagramLocal.viewBox.y" :x="70"
						:y="70" />

					<NavigationControl :x="presenter.navigationControlLocation.x"
						:y="presenter.navigationControlLocation.y"
						@navigate="presenter.eventsHandler.screenPadNavigationHandler"
						@stop-navigating="presenter.eventsHandler.stopNavigatingHandler"
						:keyboardNavFlag="presenter.keyboardNavFlag" :navFlag="presenter.keyboardNavFlag" />

					<DiagramToolbox v-model="diagramLocal" :x="presenter.diagramToolboxLocation.x"
						:y="presenter.diagramToolboxLocation.y" :width="175" />
				</g>
			</svg>
		</div>
		<div class="right" :style="`font-size:${diagramLocal.viewPort.width / diagramLocal.viewBox.width}rem`">
			<ElementEditor v-if="presenter.elementEditorVisible" :key="presenter.editElement?.key"
				@close="presenter.eventsHandler.closeElementEditorHandler" v-model="(presenter.editElement as any)"
				@update:element="presenter.eventsHandler.updateElementHandler"
				@delete:element="presenter.eventsHandler.deleteElement" />

			<DiagramEditor v-if="!presenter.elementEditorVisible"
				@close="presenter.eventsHandler.closeElementEditorHandler" v-model="diagramLocal"
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

	.left {
		flex: 1 1 auto;
		cursor: default;

		svg.dragging {
			cursor: grabbing
		}

		svg {
			&:focus {
				outline: solid 1px lime;
				text-decoration: none;
			}

			font-size: 1rem;
			width: 100%;
			height: 100%;
		}
	}

	.right {
		// overflow-x: auto;
		max-width: 20rem;
		flex: 0 0 20rem;
	}
}
</style>