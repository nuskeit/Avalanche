<script setup lang="ts">
import { computed } from "vue";
import { I_Parameter } from "../../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import TextBox from '../../../../controls/TextBox.vue';
import RefTypeSelector from '../../../../controls/RefTypeSelector.vue';
import ValTypeSelector from '../../../../controls/ValTypeSelector.vue';
import ParameterEditor from "./ParameterEditor.vue";
import { AppFactory } from "../../../../../core/factories/app-factory/application";
import { DataType, ParamDirection, ParamValRef } from "../../../../../core/general/domain";
import { ParametersEditorPresenter } from "./parameters-editor-presenter";

const props = defineProps<{ modelValue: I_Parameter[] }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_Parameter[]): void
}>()

const parameters = computed<I_Parameter[]>({
	get: (): I_Parameter[] => props.modelValue,
	set: (value: I_Parameter[]) => emit("update:modelValue", value)
})

const presenter: ParametersEditorPresenter = new ParametersEditorPresenter(
	{
		presenterProxy: () => presenter,
		parametersProxy: () => parameters.value
	},
	parameters.value)

</script>

<template>
	<div class="parameters-editor_root">

		<template v-for="p,i in parameters" :key="Math.random()">
			<ParameterEditor v-model="parameters[i]" :index="i" :action="'delete'"
				@action-button-click="presenter.eventsHandler.deleteParameterHandler" />
		</template>

		<ParameterEditor v-model="presenter.newParameter" :index="-1" :action="'add'"
			@action-button-click="presenter.eventsHandler.addParameterHandler" />

	</div>
</template>

<style scoped lang="scss">
.parameters-editor_root {

}
</style>