<script setup lang="ts">
import { provide } from 'vue'
import RootDiagramUI from './components/RootDiagramUI.vue'

provide("user", "Hardcoded User Name")

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
	//height: 100%;
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
