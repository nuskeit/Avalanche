<script setup lang="ts">
import { ref } from "vue";
import { I_Field } from "../../../core/field/domain";

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
	<div class="field-list">
		<div class="seccion-title">Properties</div>

		<div :class="`row item ${selectedField==field.key ? 'selected' :''} ${field.valid ? '' :'invalid'}`"
			v-for="field, i in propertiesList" :key="Math.random()" @click="selectField( propertiesList[i]) ">
			<div>{{`${field.scopeSymbol} ${field.name}`}}</div>
			<div class="type-name">{{`${field.dataTypeDef.name}`}}</div>
		</div>

		<div :class="`row item ${selectedField==field.key ? 'selected' :''} ${field.valid ? '' :'invalid'}`"
			v-for="field, i in methodsList" :key="Math.random()" @click="selectField( methodsList[i]) ">
			<div>{{`${field.scopeSymbol} ${field.name}`}}</div>
			<div class="field-parameters">( {{`${field.parameters?.map(x => x.name + " ")}`}}) <span class="type-name">{{`${field.dataTypeDef.name}`}}</span>
			</div>
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

