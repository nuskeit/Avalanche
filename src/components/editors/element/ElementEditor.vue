<script setup lang="ts">
import { computed, inject, reactive, ref, watchEffect } from "vue";
import { I_Element } from "../../../core/avalanche-app/root-diagram/diagram/element/domain";
import TextBox from '../../controls/TextBox.vue';
import { ElementEditorPresenter } from "./element-editor-presenter";
import FieldEditor from "./field-editor/FieldEditor.vue";
import SplitPanel from "./SplitPanel.vue";
import FieldsList from "./FieldsList.vue";
import DeleteButton from "../../controls/buttons/DeleteButton.vue";

const props = defineProps<{
	modelValue: I_Element
}>()

console.log('ELEMENT EDITOR LOADED');

const emit = defineEmits<{
	(e: "addNewPropertyField"): void,
	(e: "addNewMethodField"): void,
	(e: "addNewEventField"): void,
	(e: "update:modelValue", payload: I_Element): void
	(e: "delete:element", element: I_Element): void
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
		presenterProxy: () => presenter,
		elementProxy: () => element.value
	}))

// const handleClose = async () => {
// 	emit("close")
// }
</script>

<template>
	<div class="element-editor_root form">

		<SplitPanel>
			<template #top>
				<div class="top">
					<div class="header">
						<div class="element-name">
							<TextBox :id="`${element.key}`" v-model="element.name" />
						</div>
						<div class="element-type">
							{{ element.elementType }}
						</div>
						<div class="corner-button">
							<DeleteButton @click="emit('delete:element', element)" />
						</div>
					</div>

					<FieldsList :properties-list="presenter.listProperties" :methods-list="presenter.listMethods"
						:events-list="presenter.listEvents" @select-field="presenter.eventsHandler.selectField"
						@new-property="presenter.eventsHandler.handleAddNewProperyField"
						@new-method="presenter.eventsHandler.handleAddNewMethodField"
						@new-event="presenter.eventsHandler.handleAddNewEventField" />

				</div>

			</template>

			<template #bottom>


				<div class="element-editor_row" v-if="presenter.selectedField!=null">
					<FieldEditor v-model="presenter.selectedField"  @delete:field="presenter.eventsHandler.handleDeleteField"/>
					<!-- <button @click="presenter.eventsHandler.handleAddNewProperyField">+</button> -->
				</div>

			</template>
		</SplitPanel>

	</div>
</template>

<style scoped lang="scss">
.element-editor_root {

	background-color: #333;
	padding: 0;
	color: #ddd;
	font-size: .7rem;
	height: 100%;

	.top {

		background-color: #0a5a;

		.header {
			display: flex;
			flex-direction: row;
			background-color: #444;
			align-items: center;

			.element-name {
				text-align: left;
				white-space: nowrap;
				flex: 1 1 auto;
				cursor: pointer;
			}

			.element-type {
				white-space: nowrap;
				flex: 1 1 auto;
				border: #0a5 solid 1px;
			}

			.corner-button {
				flex: 0 0 .1rem;
			}
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

		.action-button {
			width: 100%;
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