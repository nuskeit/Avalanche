<script setup lang="ts">
import { computed, inject, reactive, ref, watchEffect } from "vue";
import { I_Element } from "../../../core/element/domain";
import TextBox from '../../controls/TextBox.vue';
import { ElementEditorPresenter } from "./element-editor-presenter";
import FieldEditor from "../field-editor/FieldEditor.vue";
import SplitPanel from "./SplitPanel.vue";
import FieldsList from "./FieldsList.vue";
import DeleteButton from "../../controls/buttons/DeleteButton.vue";

const props = defineProps<{
	modelValue: I_Element
}>()

const emit = defineEmits<{
	(e: "addNewPropertyField"): void
	(e: "addNewMethodField"): void
	(e: "addNewEventField"): void
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
	<div class="element-editor form">

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
