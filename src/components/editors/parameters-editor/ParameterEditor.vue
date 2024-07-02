<script setup lang="ts">
import { computed } from "vue";
import { I_Parameter } from "../../../core/field/domain";
import TextBox from '../../controls/TextBox.vue';
import ConfirmButton from "../../controls/buttons/ConfirmButton.vue";
import DeleteButton from "../../controls/buttons/DeleteButton.vue";
import TypeDefEditor from "../type-def-editor/TypeDefEditor.vue";

const props = defineProps<{
	index: number
	modelValue: I_Parameter
	action: "confirm" | "delete"
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_Parameter): void
	(e: "action:delete", index: number, value: I_Parameter): void
	(e: "action:confirm", index: number, value: I_Parameter): void
}>()

const parameter = computed<I_Parameter>({
	get: (): I_Parameter => props.modelValue,
	set: (value: I_Parameter) => emit("update:modelValue", value)
})

function actionButtonDeleteHandler() {
	emit('action:delete', props.index, parameter.value)
}

function actionButtonConfirmHandler() {
	emit('action:confirm', props.index, parameter.value)
}


</script>

<template>
	<div class="parameter-editor-row division-title">
		<div>Parameter Name:</div>
		<div>
			<TextBox v-model="parameter.name" :id="parameter.name"
				:class-name="`${parameter.validProp['name'] ? '' : 'invalid'} `" />
		</div>
	</div>
	<div class="row">
		<div>
			<TypeDefEditor v-model="parameter.dataTypeDef" />
		</div>
		<div class="button-col">
			<ConfirmButton @click="actionButtonConfirmHandler" v-if="action == 'confirm'" />
			<DeleteButton @click="actionButtonDeleteHandler" v-if="action == 'delete'" />
		</div>
	</div>
</template>
