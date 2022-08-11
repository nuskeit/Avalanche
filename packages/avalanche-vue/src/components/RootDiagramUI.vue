<script setup lang="ts">
import { onMounted, onUnmounted, reactive } from 'vue';
import DiagramUI from './diagrams/DiagramUI.vue';
import TabsStrip from './TabsStrip.vue';
//custom types
import { HttpInPort, RootDiagramPresenter, RootDiagramRepo } from "../../../avalanche-core";
import { getAppConfig } from '../app-config';

// get Config dependency to inject
const appConfig = getAppConfig()
// create httpInPort dependency to inject
const httpInPort = new HttpInPort(appConfig)

// create Repository dependency to inject
const repo = new RootDiagramRepo(httpInPort)

// Create presenter
const rootDiagramPresenter = new RootDiagramPresenter(repo, "rd1")

// inject dependencies
// const presenter = reactive<RootDiagramPresenter>(
// 	await rootDiagramPresenter
// 		.addDependency_repoConnector(repo)
// )

const presenter = reactive<RootDiagramPresenter>(
	await rootDiagramPresenter
		.addDependency_repoConnector(repo)
		.loadAsync()
)



const handleKeyDown = async (e: KeyboardEvent) => {
	await presenter.selectElement(e.key, e.altKey)
}

onMounted(() => {
	window.addEventListener("keydown", handleKeyDown)
})

onUnmounted(() => {
	window.removeEventListener("keydown", handleKeyDown)
})

</script>

<template>
	<Suspense>
		<div class="root-diagram">
			<div class="root-diagram-title">
				<div>{{ presenter.rootDiagram?.name }} </div>
			</div>
			<div class="layout-main">
				<div class="root-diagram_tab-strip">
					<TabsStrip v-model="presenter.selectedDiagramIndex" :diagrams="presenter.rootDiagram.diagrams" />
				</div>
				<div class="root-diagram_tab-main" v-if="presenter.rootDiagram.diagrams.length > 0">
					<DiagramUI v-model="presenter.rootDiagram.diagrams[presenter.selectedDiagramIndex]"
						:key="presenter.selectedDiagramIndex" />
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

	.root-diagram-title {
		color: #ccc;
		height: 1.5rem;
		font-size: 1rem;
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
			flex: 0 0 3.2rem;
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
