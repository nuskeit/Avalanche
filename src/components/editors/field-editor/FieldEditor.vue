<script setup lang="ts">
import { computed, reactive } from "vue";
import { MethodField } from "../../../core/avalanche-app/root-diagram/diagram/element/field/application";
import { I_Field } from "../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { FieldType } from "../../../core/general/domain";
import TextBox from '../../controls/TextBox.vue';
import { FieldEditorPresenter } from "./field-editor-presenter";
import ParametersEditor from "../parameters-editor/ParametersEditor.vue";
import TypeDefEditor from "../type-def-editor/TypeDefEditor.vue";
import DeleteButton from "../../controls/buttons/DeleteButton.vue";

const props = defineProps<{ modelValue: I_Field }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_Field): void
	(e: "delete:field", value: I_Field): void
}>()

const field = computed<I_Field>({
	get: (): I_Field => props.modelValue,
	set: (value: I_Field) => emit("update:modelValue", value)
})

const presenter: FieldEditorPresenter = reactive<FieldEditorPresenter>(new FieldEditorPresenter({ presenterProxy: () => presenter, fieldProxy: () => field.value }))

</script>

<template>
	<div class="field-editor">

		<div class="row header">

			<div class="col">
				<TextBox :id="field.key" v-model="field.name"
					:className="`shy-input ${field.validProp['name'] ? '' :'invalid'} `" />
			</div>

			<div class="field-type">
				{{ field.fieldType }}
			</div>

			<div class="corner-button">
				<DeleteButton @click="emit('delete:field', field)" />
			</div>

		</div>

		<div class="row division-title">
			Description:
		</div>

		<div class="row">
			<TextBox :id="field.key" v-model="field.description" :className="'regular-input'" />
		</div>

		<div class="row division-title">
			DataType:
		</div>
		<div class="row">
			<TypeDefEditor v-model="field.dataTypeDef" />
		</div>


		<template v-if="field.fieldType == FieldType.Method || field.fieldType == FieldType.Event ">
			<div class="row division-title">
				Parameters:
			</div>
			<ParametersEditor v-model="(presenter.fieldProxy as MethodField).parameters" />
		</template>
	</div>

</template>

