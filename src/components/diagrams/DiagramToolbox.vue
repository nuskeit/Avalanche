<script setup lang="ts">
import { computed, inject } from 'vue';
import { AvalancheApp } from '../../core/avalanche-app/application';
import { I_Diagram } from '../../core/avalanche-app/root-diagram/diagram/domain';
import { BlockEntity, ClassEntity, ComponentEntity, EnumEntity, GenericEntity, InterfaceEntity } from '../../core/avalanche-app/root-diagram/diagram/element/application';
import { I_Element, I_ElementsStore } from '../../core/avalanche-app/root-diagram/diagram/element/domain';
import { GeneralFactory } from '../../core/factories/application';
import { ElementType } from '../../core/general/domain';
import { DiagramToolbox } from '../../core/toolbox/domain';
import BoxedText from '../controls/svg/BoxedText.vue';

const props = defineProps<{
	modelValue: I_Diagram
	x: number
	y: number
	width: number
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', diagram: I_Diagram): void
}>()

const diagram = computed<I_Diagram>({
	get(): I_Diagram { return props.modelValue },
	set(value: I_Diagram) { emit('update:modelValue', value) }
})

const avalancheApp = inject("avalanche-app") as AvalancheApp

const diagramToolbox: DiagramToolbox = new DiagramToolbox()

const addComponent = (el: I_Element): void => {
	el.name = `${el.elementType} ${el.key}`
	el.visible = true
	diagram.value.createElement(el)
}

function addComponentHandler() {
	const pe: I_Element = avalancheApp.generalFactory.createElement(ElementType.Component, undefined)
	addComponent(pe)
}

function addBlockHandler() {
	const pe: I_Element = avalancheApp.generalFactory.createElement(ElementType.Block, undefined)
	addComponent(pe)
}

function addClassHandler() {
	const pe: I_Element = avalancheApp.generalFactory.createElement(ElementType.Class, undefined)
	addComponent(pe)
}

function addInterfaceHandler() {
	const pe: I_Element = avalancheApp.generalFactory.createElement(ElementType.Interface, undefined)
	addComponent(pe)
}

function addEnumHandler() {
	const pe: I_Element = avalancheApp.generalFactory.createElement(ElementType.Enum, undefined)
	addComponent(pe)
}


function addGenericEntityHandler() {
	const pe: I_Element = avalancheApp.generalFactory.createElement(ElementType.GenericEntity, undefined)
	addComponent(pe)
}

function addCommandHandler(e: ElementType) {
	switch (e) {
		case ElementType.Component:
			addComponentHandler()
			break;
		case ElementType.Block:
			addBlockHandler()
			break;
		case ElementType.Class:
			addClassHandler()
			break;
		case ElementType.Interface:
			addInterfaceHandler()
			break;
		case ElementType.Enum:
			addEnumHandler()
			break;
		case ElementType.GenericEntity:
			addGenericEntityHandler()
			break;

		default:
			break;
	}
}

</script>

<template>
	<g :transform="`translate (${x} ${y})`">
		<BoxedText :x="0" :y="0" :width="props.width" :height="30" :fill="'#444'" :color="'#ddd'" :text="'Toolbox'"
			:vertical-trim="7" />

		<g v-for="x, i in diagramToolbox.getMenuItemsByDiagramType(diagram.diagramType)">
			<BoxedText :x="0" :y="31 + 31 * i" :width="props.width" :height="30" :fill="'#aaa'" :color="'#000'"
				:text="x" :vertical-trim="7" @click="(e) => addCommandHandler(x)" />
		</g>

	</g>
</template>

<style scoped lang="scss">
.diagram-toolbox-title {
	fill: #000;
	color: #ddd;
	font-size: 1.2rem;
	font-weight: bold;
}

.row {
	fill: #888;
	height: 1.2rem;
	cursor: pointer;
	display: flex;
	flex-direction: column;
	align-items: center;
	align-content: center;
	border-radius: .1rem;
	border: solid .1rem #444;

	&>div {
		height: 100%;
		display: flex;
		flex-direction: row;
		align-items: center;
		font-size: .9rem;
		font-weight: bold;
	}
}

.row:hover {
	background-color: #6f6;
	color: #000;
}
</style>