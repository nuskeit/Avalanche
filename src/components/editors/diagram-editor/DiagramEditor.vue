<script setup lang="ts">
import { computed } from "vue";
import { I_Diagram } from "../../../core/diagram/domain";
import DeleteButton from "../../controls/buttons/DeleteButton.vue";
import TextBox from '../../controls/TextBox.vue';

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
		<slot></slot>

		<!-- <div class="element-editor_row">
			<slot name="zoom"></slot>
		</div>

		<div class="element-editor_row">
			<slot name="listing-new-elements"></slot>
		</div>

		<div class="element-editor_row">
			<slot name="listing-existing-elements"></slot>
		</div> -->

	</div>
</template>
	