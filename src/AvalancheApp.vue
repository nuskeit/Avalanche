<script lang="ts" setup >
import { provide, reactive } from 'vue';
import RootDiagramUI from './components/RootDiagramUI.vue';
import { I_ElementsStore } from './core/avalanche-app/root-diagram/diagram/element/domain';
import { AppFactory } from './core/factories/app-factory/application';
import { I_RelationshipsStore } from './core/relationships/domain';

const avalancheApp = AppFactory.getSingleton().createApp()

provide("avalanche-app", avalancheApp)

await avalancheApp.loadRootPlanAsync("rd4")

provide("elements-store", reactive<I_ElementsStore>(avalancheApp.rootDiagram.elementsStore))
provide("relationships-store", reactive<I_RelationshipsStore>(avalancheApp.rootDiagram.relationshipsStore))

</script>

<template>
	<Suspense>
		<RootDiagramUI />
	</Suspense>
</template>

