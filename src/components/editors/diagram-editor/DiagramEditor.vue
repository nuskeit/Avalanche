<script setup lang="ts">
import { computed } from "vue";
import { I_Diagram } from "../../../core/avalanche-app/root-diagram/diagram/domain";
import TextBox from '../../controls/TextBox.vue';
import DeleteButton from "../../controls/buttons/DeleteButton.vue";

const props = defineProps<{
	modelValue: I_Diagram
}>()

const emit = defineEmits<{
	(e: "update:modelValue", payload: I_Diagram): void
	(e: "delete:diagram", diagramKey: string): void
}>()

const diagram = computed<I_Diagram>({
	get: (): I_Diagram => {
		return props.modelValue
	},
	set: (value: I_Diagram) => {
		emit("update:modelValue", value)
	}
})


function deleteDiagram() {
	emit('delete:diagram', diagram.value.key)
}

</script>

<template>
	<div class="element-editor form">
		<div class="header">
			<div class="element-name">
				<TextBox :id="`${diagram.key}`" v-model="diagram.name" />
			</div>
			<div class="corner-button">
				<DeleteButton @click="deleteDiagram" />
			</div>
		</div>

		<div class="listing">
			<div class="element-editor_row listing-item">
				<slot></slot>
			</div>
		</div>

	</div>
</template>
	