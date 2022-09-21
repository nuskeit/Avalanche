<script setup lang="ts">
import { computed, inject, reactive, ref, watchEffect } from "vue";
import { I_Element } from "../../../core/avalanche-app/root-diagram/diagram/element/domain";
import TextBox from '../../controls/TextBox.vue';
import { ElementEditorPresenter } from "./element-editor-presenter";
import FieldEditor from "./field-editor/FieldEditor.vue";

const props = defineProps<{
	modelValue: I_Element
}>()

const emit = defineEmits<{
	(e: "addNewPropertyField"): void,
	(e: "addNewMethodField"): void,
	(e: "addNewEventField"): void,
	(e: "update:modelValue", payload: I_Element): void
}>()

const element = computed<I_Element>({
	get: (): I_Element => {
		return props.modelValue
	},
	set: (value: I_Element) => {
		emit("update:modelValue", value)
	}
})

const presenter: ElementEditorPresenter = reactive<ElementEditorPresenter>(new ElementEditorPresenter(
	{
		elementProxy: () => element.value
	}))


// const handleClose = async () => {
// 	emit("close")
// }
const activeNewProp = ref(true)
const activeNewMethod = ref(true)
const activeNewEvent = ref(true)
</script>

<template>
	<div class="element-editor_root form">
		<div class="header">
			<div class="element-name">
				<TextBox :id="`${element.key}`" v-model="element.name" />
			</div>
			<div class="element-type">
				{{ element.elementType }}
			</div>
		</div>

		<div class="element-editor_row" v-for="field, i in presenter.listProperties" :key="field.key">
			<FieldEditor v-model="presenter.listProperties[i]" />
		</div>
		<div :class="`element-editor_row new ${activeNewProp ? 'active' : ''}`" @pointerdown="activeNewProp=true">
			<FieldEditor v-model="presenter.newPropertyField" />
			<button @click="presenter.eventsHandler.handleAddNewProperyField">+</button>
		</div>

		<div class="element-editor_row" v-for="field, i in presenter.listMethods" :key="field.key">
			<FieldEditor v-model="presenter.listMethods[i]" />
		</div>
		<div :class="`element-editor_row new ${activeNewMethod ? 'active' : ''}`" @pointerdown="activeNewMethod=true">
			<FieldEditor v-model="presenter.newMethodField" />
			<button @click="presenter.eventsHandler.handleAddNewMethodField">+</button>
		</div>

		<div class="element-editor_row" v-for="field, i in presenter.listEvents" :key="field.key">
			<FieldEditor v-model="presenter.listEvents[i]" />
		</div>
		<div :class="`element-editor_row new ${activeNewEvent ? 'active' : ''}`" @pointerdown="activeNewEvent=true">
			<FieldEditor v-model="presenter.newEventField" />
			<button @click="presenter.eventsHandler.handleAddNewEventField">+</button>
		</div>

	</div>
</template>

<style scoped lang="scss">
.element-editor_root {

	background-color: #333e;
	border: solid rgba(#bbb, .5) .1rem;
	box-shadow: .2rem .2rem .2rem rgba(#000, .5);
	padding: 0;
	color: #ddd;
	font-size: .7rem;

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
		//overflow: hidden;

		button {
			background-color: #555;
			color: #5af;
		}
	}

	.new {
		background-color: #0a5;
		height: .4rem;

	}

	.active {
		height: unset;
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