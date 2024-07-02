<script setup lang="ts">
import { computed, inject, reactive } from 'vue';
import { AvalancheApp } from '../../core/avalanche-app/application';
import { I_Diagram } from '../../core/diagram/domain';
import { DiagramToolboxRepo } from '../../core/toolbox/data';
import { AddNewElementPresenter } from "./add-new-element-presenter";
const props = defineProps<{
	modelValue: I_Diagram
}>()

const emit = defineEmits<{
	(e: 'update:modelValue', diagram: I_Diagram): void
}>()

const diagram = computed<I_Diagram>({
	get(): I_Diagram { return props.modelValue },
	set(value: I_Diagram) { emit('update:modelValue', value) }
})



const avalancheApp = inject("avalanche-app") as AvalancheApp

const diagramToolbox: DiagramToolboxRepo = new DiagramToolboxRepo()

const presenter: AddNewElementPresenter = reactive<AddNewElementPresenter>(
	new AddNewElementPresenter({
		diagramProxy: () => diagram.value,
		presenterProxy: () => presenter
	}, avalancheApp)
)




</script>

<template>
	<div class="diagram-toolbox">
		<div class="row" v-for="x, i in diagramToolbox.getNewElementsByDiagramType(diagram.diagramType)">
			<div @dblclick="(e) => presenter.eventsHandler.addCommandHandler(x)">+ {{ x }}</div>
		</div>
	</div>
</template>

