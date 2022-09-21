<script lang="ts" setup >
import { provide, reactive } from 'vue';
import RootDiagramUI from './components/RootDiagramUI.vue';
import { I_ElementsStore } from './core/avalanche-app/root-diagram/diagram/element/domain';
import { AppFactory } from './core/factories/app-factory/application';
import { I_RelationshipsStore } from './core/relationships/domain';

const avalancheApp = AppFactory.getSingleton().createApp()

provide("avalanche-app", avalancheApp)

await avalancheApp.loadRootPlanAsync("rd1")

provide("elements-store", reactive<I_ElementsStore>(avalancheApp.rootDiagram.elementsStore))
provide("relationships-store", reactive<I_RelationshipsStore>(avalancheApp.rootDiagram.relationshipsStore))

</script>

<template>
	<Suspense>
		<RootDiagramUI />
	</Suspense>
</template>

<style lang="scss">
@use 'styles/general.scss';

body {
	overflow: hidden;
}

#app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	font-size: 62.5%;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 0;
	width: 100%;
	position: absolute;
	left: 0;
	right: 0;
	top: 0;
	bottom: 0;
	background-color: lightgreen;
	margin: 0;
	padding: 0;
}


/*MENU*/

.not-selectable {
	user-select: none;
}
</style>
