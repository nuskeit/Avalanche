<script setup lang="ts">
import { inject, onMounted, onUnmounted, reactive } from 'vue';
import DiagramUI from './diagrams/DiagramUI.vue';
import TabsStrip from './TabsStrip.vue';
//custom types
import { AvalancheApp } from '../core/avalanche-app/application';
import { RootDiagramPresenter } from "./root-diagram-presenter";
import SaveButton from './controls/buttons/SaveButton.vue';
import { preseter } from '../core/general';

// Create object model reference (OMR)
const avalancheApp = inject("avalanche-app") as AvalancheApp

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
				<SaveButton :className="'save-button'"
					@click="rootDiagramPresenter.eventsHandler.handleSaveRootDiagram" />
			</div>
			<div class="root-diagram-title">
				<div>{{ rootDiagramPresenter.rootDiagramProxy?.name }} </div>
			</div>
			<div class="layout-main">
				<div class="root-diagram_tab-strip">
					<TabsStrip v-model="rootDiagramPresenter.selectedDiagramIndex"
						:diagrams="rootDiagramPresenter.rootDiagramProxy.diagrams" />
				</div>
				<div class="root-diagram_tab-main" v-if="rootDiagramPresenter.rootDiagramProxy.diagrams.length > 0">
					<DiagramUI
						v-model="rootDiagramPresenter.rootDiagramProxy.diagrams[rootDiagramPresenter.selectedDiagramIndex]"
						:key="rootDiagramPresenter.selectedDiagramIndex" />
				</div>
			</div>
		</div>
	</Suspense>
</template>

<style scoped lang="scss">
.root-diagram {
	background-color: #334;
	display: flex;
	flex-direction: column;
	position: relative;
	width: 100%;
	height: 100%;
	box-sizing: border-box;

	.root-diagram-toolbar {
		color: #ccc;
		background-color: #000;
		font-size: .5rem;
		overflow: hidden;
		display: flex;
		align-items: center;
		padding: .1rem;
		flex: 0 0 1.5rem;

		.save-button {
			//	width: 1.5rem;
			height: 100%;
		}
	}

	.root-diagram-title {
		color: #ccc;
		font-size: 1.2rem;
		display: flex;
		align-items: center;
		padding: .2rem;
		flex: 0 0 1.2rem;
	}

	.layout-main {
		flex: 1 0 auto;
		position: relative;
		top: 0;
		display: flex;
		flex-direction: column;

		.root-diagram_tab-strip {
			position: relative;
			flex: 0 0 2.2rem;
			// border: solid 1px lime;
			box-sizing: border-box;
			z-index: 10;
		}

		.root-diagram_tab-main {
			flex: 1 1 auto;
			position: relative;
			// border: solid 1px orange;
			box-sizing: border-box;
			z-index: 0;
		}

	}


}
</style>
