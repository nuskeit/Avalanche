<script setup lang="ts">
import { computed, reactive } from "vue";
import { I_ElementsRelationship } from "../../../core/relationships/domain";
import DeleteButton from "../../controls/buttons/DeleteButton.vue";
import RelationshipTypeSelector from "../../controls/RelationshipTypeSelector.vue";
import TextBox from '../../controls/TextBox.vue';
import FieldEditor from "../field-editor/FieldEditor.vue";
import { ConnectionEditorPresenter } from "./connection-editor-presenter";
import FieldsList from "./FieldsList.vue";
import SplitPanel from "./SplitPanel.vue";

const props = defineProps<{
	modelValue: I_ElementsRelationship
}>()

const emit = defineEmits<{
	(e: "addNewPropertyField"): void
	(e: "addNewMethodField"): void
	(e: "addNewEventField"): void
	(e: "update:modelValue", payload: I_ElementsRelationship): void
	(e: "delete:relationship", rel: I_ElementsRelationship): void
}>()

const rel = computed<I_ElementsRelationship>({
	get: (): I_ElementsRelationship => {
		return props.modelValue
	},
	set: (value: I_ElementsRelationship) => {
		emit("update:modelValue", value)
	}
})

const presenter: ConnectionEditorPresenter = reactive<ConnectionEditorPresenter>(new ConnectionEditorPresenter(
	{
		presenterProxy: () => presenter,
		relationshipProxy: () => rel.value
	}))

// const handleClose = async () => {
// 	emit("close")
// }
</script>

<template>
	<div class="editor-root form">

		<div class="editor-row">
			<div class="editor-col">
				Key
			</div>
			<div class="editor-col">
				{{ rel.key }}
			</div>
		</div>

		<div class="editor-row">
			<div class="editor-col">
				Tag
			</div>
			<div class="editor-col">
				<TextBox :id="`${rel.key}`" v-model="rel.tag" />
			</div>
		</div>

		<div class="editor-row">
			<div class="editor-col">
				Type
			</div>
			<div class="editor-col">
				<RelationshipTypeSelector id="aaaa" v-model="rel.relationshipType" />
			</div>
		</div>

		<div class="editor-row">
			<div class="editor-col">
				Delete
			</div>
			<div class="editor-col flex-items-center">
				<DeleteButton @click="emit('delete:relationship', rel)" />
			</div>
		</div>

	</div>
</template>
