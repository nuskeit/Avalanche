<script setup lang="ts">
import { computed, inject } from "vue";
import { AvalancheApp } from "../../../core/avalanche-app/application";
import { I_Element } from "../../../core/avalanche-app/root-diagram/diagram/element/domain";
import TextBox from '../../controls/TextBox.vue';
import { ElementEditorPresenter } from "./element-editor-presenter";
import FieldEditor from "./field-editor/FieldEditor.vue";

const props = defineProps<{ element: I_Element }>()

const emit = defineEmits<{
	(e: "addNewPropertyField"): void,
	(e: "addNewMethodField"): void,
	(e: "addNewEventField"): void,
	(e: "update:element", payload: I_Element): void
}>()

const avalancheApp = inject("avalanche-app") as AvalancheApp

const element = computed<I_Element>({
	get: (): I_Element => props.element,
	set: (value: I_Element) => emit("update:element", value)
})

const presenter: ElementEditorPresenter = new ElementEditorPresenter(() => presenter, element.value)


// const handleClose = async () => {
// 	emit("close")
// }

const handleAddNewField = async () => {
	//emit("update:element", element)
}

</script>

<template>
	<div class="element-editor_root">
		<div class="header">
			<div class="element-name">
				<TextBox :id="`${element.key}`" v-model="element.name" :style="{ color: '#fff' }" />
			</div>
			<div class="element-type">
				{{ element.elementType }}
			</div>

		</div>

		<div class="element-editor_row" v-for="field, i in element.fields" :key="field.key">

			<FieldEditor v-model="element.fields[i]" />

		</div>


		<div class="element-editor_row">

			<div class="buttons">
				<button @click="handleAddNewField">Add Field</button>
			</div>

		</div>

	</div>
</template>

<style scoped lang="scss">
.element-editor_root {
	background-color: #333;
	border: solid rgba(#bbb, .5) .1rem;
	box-shadow: .2rem .2rem .2rem rgba(#000, .5);
	padding: 0;
	color: #ddd;

	.header {
		display: flex;
		flex-direction: row;
		background-color: #444;
		align-items: center;
		.element-name {
			text-align: left;
			white-space: nowrap;
			flex: 1 1 auto;
		}

		.element-type {
			white-space: nowrap;
			flex: 1 1 .1rem;
		}
	}

	.element-editor_row {
		display: flex;
		flex-direction: row;
		padding: 0;
		border-top: solid #555 .01rem;
		white-space: nowrap;
		overflow: hidden;
	}

	// 	&:nth-last-child(1) {
	// 		border: none
	// 	}

	// 	.element-editor_cell {
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;

	// 	}

	// 	.editable {
	// 		background: rgba(#03a, .2);
	// 		border: solid .1rem rgba(#03a, .2);
	// 		padding-left: .2rem;
	// 		padding-right: .2rem;
	// 	}

	// 	.tag {
	// 		padding-left: .2rem;
	// 		padding-right: .2rem;
	// 	}
	// }

}
</style>