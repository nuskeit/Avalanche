<script setup lang="ts">
import { inject, onMounted, onUnmounted, reactive } from 'vue';
import DiagramUI from './diagrams/DiagramUI.vue';
import TabsStrip from './TabsStrip.vue';
//custom types
import { AvalancheApp } from '../core/avalanche-app/application';
import { I_AvalancheApp } from '../core/avalanche-app/domain';
import SaveButton from './controls/buttons/SaveButton.vue';
import { RootDiagramPresenter } from "./root-diagram-presenter";
import { I_Diagram } from '../core/avalanche-app/root-diagram/diagram/domain';

// Create object model reference (OMR)
const avalancheApp = reactive<I_AvalancheApp>(inject("avalanche-app") as AvalancheApp)

/**
 * Create presenter, make it reactive and inject the OMR Proxy accesor, along with the
 * accesor for the presenter proxy itself
*/
const rootDiagramPresenter: RootDiagramPresenter = reactive<RootDiagramPresenter>(
	new RootDiagramPresenter(
		{
			presenterProxy: () => rootDiagramPresenter,
			rootDiagramProxy: () => avalancheApp.rootDiagram
		}))

onMounted(() => {
	window.addEventListener("keydown", rootDiagramPresenter.eventsHandler.handleKeyDown)
})

onUnmounted(() => {
	window.removeEventListener("keydown", rootDiagramPresenter.eventsHandler.handleKeyDown)
})

</script>

<template>
	<Suspense>
		<div class="root-diagram">
			<div class="root-diagram-toolbar">
				<SaveButton :className="'root-diagram-save-button'"
					@click="rootDiagramPresenter.eventsHandler.handleSaveRootDiagram" />
			</div>
			<div class="root-diagram-title">
				<div>{{ rootDiagramPresenter.rootDiagramProxy?.name }} </div>
			</div>
			<div class="layout-main">
				<div class="root-diagram_tab-strip">
					<TabsStrip v-model="rootDiagramPresenter.selectedDiagramIndex"
						:diagrams="rootDiagramPresenter.rootDiagramProxy.diagrams"
						@new:diagram="rootDiagramPresenter.eventsHandler.handleAddNewDiagram"
						@delete:diagram="rootDiagramPresenter.eventsHandler.handleDeleteDiagram" />
				</div>
				<div class="root-diagram_tab-main"
					v-if="rootDiagramPresenter.rootDiagramProxy.diagrams.length > 0 && rootDiagramPresenter.selectedDiagram!=null">
					<DiagramUI v-model="rootDiagramPresenter.selectedDiagram"
						:key="rootDiagramPresenter.selectedDiagramIndex"
						@delete:diagram="rootDiagramPresenter.eventsHandler.handleDeleteDiagram" />
				</div>
			</div>
		</div>
	</Suspense>
</template>
