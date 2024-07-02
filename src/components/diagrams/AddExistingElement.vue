<script setup lang="ts">
import { computed, inject, reactive } from 'vue';
import { AvalancheApp } from '../../core/avalanche-app/application';
import { I_Diagram } from '../../core/diagram/domain';
import { I_ElementsStore } from '../../core/element/domain';
import { DiagramToolboxRepo } from '../../core/toolbox/data';
import { AddExistingElementPresenter } from './add-existing-element-presenter';
const props = defineProps<{
	modelValue: I_Diagram
}>()

const elementsStore = inject<I_ElementsStore>("elements-store")

const emit = defineEmits<{
	(e: 'update:modelValue', diagram: I_Diagram): void
}>()

const diagram = computed<I_Diagram>({
	get(): I_Diagram { return props.modelValue },
	set(value: I_Diagram) { emit('update:modelValue', value) }
})



const avalancheApp = inject("avalanche-app") as AvalancheApp

const diagramToolboxRepo: DiagramToolboxRepo = new DiagramToolboxRepo()

const presenter: AddExistingElementPresenter = reactive<AddExistingElementPresenter>(
	new AddExistingElementPresenter({
		diagramProxy: () => diagram.value,
		presenterProxy: () => presenter,
		repoProxy: () => diagramToolboxRepo,
		elementsStoreProxy: () => elementsStore as I_ElementsStore,
	}, avalancheApp)
)




</script>

<template>
	<div class="diagram-toolbox">
		<div class="row" v-for="x, i in presenter.menuElements">
			<div @dblclick="() => presenter.eventsHandler.addCommandHandler(x)">
				<span>+ {{ x.name }}</span>&nbsp;
				<span style="font-size:.5rem; color:gray">({{ x.key }})</span>
			</div>
		</div>
	</div>
</template>

