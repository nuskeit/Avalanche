<script setup lang="ts">
import { ref } from "vue";
import { I_Field } from "../../../core/avalanche-app/root-diagram/diagram/element/field/domain";

const props = defineProps<{
	propertiesList: I_Field[]
	methodsList: I_Field[]
	eventsList: I_Field[]
}>()

const emit = defineEmits<{
	(e: "selectField", element: I_Field): void
	(e: "newProperty"): void
	(e: "newMethod"): void
	(e: "newEvent"): void
}>()

const selectedField = ref<string>("")

function selectField(f: I_Field) {
	selectedField.value = f.key
	emit('selectField', f)
}


</script>

<template>
	<div class="element-editor_root">
		<div class="seccion-title">Properties</div>

		<div :class="`row item ${selectedField==field.key ? 'selected' :''} ${field.valid ? '' :'invalid'}`"
			v-for="field, i in propertiesList" :key="Math.random()" @click="selectField( propertiesList[i]) ">
			<div>{{`${field.scopeSymbol} ${field.name}`}}</div>
			<div class="type-name">{{`${field.dataTypeDef.name}`}}</div>
		</div>

		<div :class="`row item ${selectedField==field.key ? 'selected' :''} ${field.valid ? '' :'invalid'}`"
			v-for="field, i in methodsList" :key="Math.random()" @click="selectField( methodsList[i]) ">
			<div>{{`${field.scopeSymbol} ${field.name}`}}</div>
			<div class="field-parameters">( {{`${field.parameters?.map(x => x.name + " ")}`}})</div>
			<div class="type-name">{{`${field.dataTypeDef.name}`}}</div>
		</div>

		<div :class="`row item ${selectedField==field.key ? 'selected' :''} ${field.valid ? '' :'invalid'}`"
			v-for="field, i in eventsList" :key="Math.random()" @click="selectField( eventsList[i]) ">
			<div>{{`${field.scopeSymbol} ${field.name}`}}()</div>
			<div class="field-parameters">( {{`${field.parameters?.map(x => x.name + " ")}`}})</div>
			<div class="type-name">{{`${field.dataTypeDef.name}`}}</div>
		</div>

		<div class="row buttons">
			<button class="action-button" @dblclick="emit('newProperty')">+P</button>
			<button class="action-button" @dblclick="emit('newMethod')">+f()</button>
			<button class="action-button" @dblclick="emit('newEvent')">+e*</button>
		</div>

	</div>
</template>

<style scoped lang="scss">
.element-editor_root {

	background-color: #333e;
	padding: 0;
	color: #ddd;
	font-size: .7rem;
	height: 100%;

	.row {
		display: flex;
		flex-direction: row;
		padding-left: .1rem;
		padding-right: .1rem;
		border-top: solid #555 .01rem;
		white-space: nowrap;
		cursor: pointer;
		min-height: .8rem;
		//overflow: hidden;


	}

	.buttons {
		display: flex;
		flex-direction: row;

		.action-button {
			flex: 1 1 auto;
			background-color: #555;
			color: #5af;
			width: 2rem;
			margin: .2rem;
			margin-right: 0;

			&:nth-child(1) {
				margin-left: 0;
			}
		}
	}

	.selected {
		background-color: #0a5;
	}

	.active {
		height: unset;
	}

	.type-name {
		margin-left: .5rem;
		margin-right: .2rem;
		font-style: italic;
		color: #ffb;
	}

	.field-parameters{
		margin-left: .5rem;
		font-size: .6rem;
		font-style: italic;
		color: #bfb;
		white-space: initial;
		text-align: left;
	}

}
</style>