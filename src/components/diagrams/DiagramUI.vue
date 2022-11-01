<script lang="ts" setup>
import { inject, onMounted, onUnmounted, reactive, ref } from 'vue';
import { AvalancheApp } from '../../core/avalanche-app/application';

import { I_Diagram } from '../../core/avalanche-app/root-diagram/diagram/domain';
import { isUndefOrNull } from '../../core/general/domain';
import Connection from '../connectors/Connection.vue';
import OriginPointer from '../controls/OriginPointer.vue';
import DiagramEditor from '../editors/diagram-editor/DiagramEditor.vue';
import ElementEditor from '../editors/element-editor/ElementEditor.vue';
import MenuBlock from '../editors/MenuBlock.vue';
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
	(e: 'delete:diagram', diagramKey: string): void
}>()

const avalancheApp = inject("avalanche-app") as AvalancheApp

// const diagramLocal = new Diagram(props.modelValue.name, props.modelValue.diagramType,
// 	props.modelValue.viewBox, props.modelValue.viewPort)

// const diagramLocal = AppFactory.getSingleton().createDiagram(props.modelValue.name, props.modelValue.diagramType,
// 	props.modelValue.viewBox, props.modelValue.viewPort, props.modelValue.key)

// Object.assign(diagramLocal, props.modelValue)
const diagramLocal = props.modelValue

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

	window.addEventListener("resize", presenter.eventsHandler.svgResizeHandler)

	requestAnimationFrame(presenter.eventsHandler.svgResizeHandler)

	diagramSvg.value.focus()
})

onUnmounted(async () => {
	window.removeEventListener("resize", presenter.eventsHandler.svgResizeHandler)
})

function deleteDiagram(diagramKey: string) {
	emit('delete:diagram', diagramKey)
}



</script>

<template>
	<div class="diagram-root">
		<div class="left">
			<!-- :class="`checkers-${diagramLocal.diagramType.toLocaleLowerCase()} ${presenter.draggingDynamicClassName}`" -->

			<svg xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"
				preserveAspectRatio="xMinYMin slice"
				:viewBox="`${presenter.diagramProxy.viewBox.x} ${presenter.diagramProxy.viewBox.y} ${presenter.diagramProxy.viewBox.width} ${presenter.diagramProxy.viewBox.height}`"
				ref="diagramSvg"
				:class="`checkers-${diagramLocal.diagramType.toLocaleLowerCase()} ${presenter.draggingDynamicClassName}`"
				@focus="" @pointerdown="presenter.eventsHandler.diagramPointerDownHandler"
				@pointerup="presenter.eventsHandler.cancelDragHandler"
				@pointermove="presenter.eventsHandler.updateDragHandler"
				@pointerleave="presenter.eventsHandler.cancelDragHandler"
				@pointercancel="presenter.eventsHandler.cancelDragHandler"
				@keydown="presenter.eventsHandler.handleKeyDown">
				<defs>
					<svg:style type="text/css">
						{{ presenter.svgStyle }}
					</svg:style>
				</defs>

				<rect :x="presenter.diagramProxy.viewBox.x + 10" :y="presenter.diagramProxy.viewBox.y + 10"
					:width="presenter.viewBoxRealSize.width - 20" :height="presenter.viewBoxRealSize.height - 20"
					fill="#0003" stroke="#0005" />

				<!-- <GridUI :grid="new Grid(diagramLocal.viewBox,diagramLocal.viewPort)" /> -->
				<GridUI :grid="presenter.grid" />

				<DiagramOrigin />

				<!-- @open-crud="() => presenter.eventsHandler.openElementEditorHandler(diagramLocal.rootElements[elem.element.key])" -->
				<g v-for="elem in diagramLocal.elements" :key="Math.random()">
					<ElementUI v-model="diagramLocal.elements[elem.element.key]"
						:selected="elem.element.key == presenter.selectedElement?.key"
						@drag-start="presenter.eventsHandler.startDraggingElementHandler"
						@select-element="presenter.eventsHandler.selectElementHandler"
						@key-down="presenter.eventsHandler.deleteElement" />

				</g>
				<g v-for="rel in diagramLocal.relationships" :key="'rel' + rel.key">

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
					<OriginPointer v-if="presenter.originPointerVisible" :origin-x="diagramLocal.viewBox.x"
						:origin-y="diagramLocal.viewBox.y" :x="70" :y="70" />

					<!-- <NavigationControl :x="presenter.navigationControlLocation.x"
						:y="presenter.navigationControlLocation.y"
						@navigate="presenter.eventsHandler.screenPadNavigationHandler"
						@stop-navigating="presenter.eventsHandler.stopNavigatingHandler"
						:keyboardNavFlag="presenter.keyboardNavFlag" :navFlag="presenter.keyboardNavFlag" /> -->

				</g>
			</svg>
		</div>
		<div class="right" :style="`font-size:${diagramLocal.viewPort.width / diagramLocal.viewBox.width}rem`">
			<ElementEditor v-if="presenter.elementEditorVisible" :key="presenter.editElement?.key"
				v-model="(presenter.editElement as any)" @delete:element="presenter.eventsHandler.deleteElement" />

			<DiagramEditor v-if="!presenter.elementEditorVisible" v-model="diagramLocal"
				@delete:diagram="deleteDiagram">

				<MenuBlock :title="'Add Elements'">
					<DiagramToolbox v-model="diagramLocal" :x="presenter.diagramToolboxLocation.x"
						:y="presenter.diagramToolboxLocation.y" :width="175" />
				</MenuBlock>

			</DiagramEditor>

		</div>
	</div>
</template>

