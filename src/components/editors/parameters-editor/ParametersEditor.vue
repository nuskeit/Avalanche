<script setup lang="ts">
import { computed, reactive, ref } from "vue";
import { I_Parameter } from "../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import ParameterEditor from "./ParameterEditor.vue";
import { ParametersEditorPresenter } from "./parameters-editor-presenter";
import AddButton from "../../controls/buttons/AddButton.vue";

const props = defineProps<{ modelValue: I_Parameter[] }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_Parameter[]): void
}>()

const parameters = computed<I_Parameter[]>({
	get: (): I_Parameter[] => props.modelValue,
	set: (value: I_Parameter[]) => emit("update:modelValue", value)
})

const presenter: ParametersEditorPresenter = reactive<ParametersEditorPresenter>(new ParametersEditorPresenter(
	{
		presenterProxy: () => presenter,
		parametersProxy: () => parameters.value
	},
	parameters.value)
)

</script>

<template>
	<div class="parameters-editor">
		<div v-for="p,i in parameters" :key="Math.random()">
			<ParameterEditor v-model="parameters[i]" :index="i" :action="'delete'"
				@action:delete="presenter.eventsHandler.deleteParameterHandler" />
		</div>

		<div class="add-button" v-if="!presenter.addingNew">
			<div class="btn-cell">
				<!-- <AddButton @click="presenter.eventsHandler.activateNewHandler" /> -->
			</div>
		</div>

		<div v-if="presenter.addingNew">
			<ParameterEditor v-model="presenter.newParameter" :index="-1" :action="'confirm'"
				@action:confirm="presenter.eventsHandler.addParameterHandler" />
		</div>
	</div>

</template>
