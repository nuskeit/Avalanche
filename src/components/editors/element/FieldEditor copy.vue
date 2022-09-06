<script setup lang="ts">
import { computed, reactive } from "vue";
import { I_Field } from "../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import TextBox from '../../controls/TextBox.vue';
import { FieldEditorPresenter } from "./field-editor/field-editor-presenter";

const props = defineProps<{ modelValue: I_Field }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_Field): void
}>()

const field = computed<I_Field>({
	get: (): I_Field => props.modelValue,
	set: (value: I_Field) => emit("update:modelValue", value)
})

const presenter = reactive<FieldEditorPresenter>(new FieldEditorPresenter(() => presenter, field.value))

</script>

<template>
	<div class="field-editor_root">

		<div class="row">

			<div class="cell tag">
				<!-- <FieldTypesComboBox :id="field.id.toString()" v-model="field.fieldType" /> -->
				{{ field.name }}
			</div>

			<div class="cell field-type">
				{{ field.fieldType }}
			</div>

			<div class="cell">
				<img :class="`drop-down-btn ${presenter.expand ? 'flip' : ''}`"
					src="./../../../assets/drop-down-ico.png" @pointerdown="presenter.eventsHandler.toggleExpand">
			</div>

		</div>

		<template v-if="presenter.expand">

			<div class="row">
				<div class="cell tag">
					<!-- <FieldTypesComboBox :id="field.id.toString()" v-model="field.fieldType" /> -->
					{{ field.name }}
				</div>
				<div class="cell editable">
					<!-- <label :for="`text-${field.id.toString()}`">Text:</label> -->
					<TextBox :id="field.key" v-model="field.text" />
				</div>
			</div>

			<div class="row">
				<div class="cell tag">
					<!-- <FieldTypesComboBox :id="field.id.toString()" v-model="field.fieldType" /> -->
					{{ field.name }}
				</div>

				<div class="cell field-type">
					{{ field.fieldType }}
				</div>
			</div>


		</template>

	</div>
</template>

<style scoped lang="scss">
.field-editor_root {
	display: flex;
	flex-direction: column;
	padding: .05rem;
	border-bottom: solid #5f5 .01rem;
	white-space: nowrap;
	overflow: hidden;

	&:nth-last-child(1) {
		border: none
	}

	.row {
		display: flex;
		flex-direction: row;

		.cell {
			display: flex;
			flex-direction: row;
			align-items: center;
			padding-left: .1rem;
		}

		.editable {
			background: rgba(#fff, .1);
			//		border: solid .1rem rgba(#03a, .2);
			padding-left: .2rem;
			padding-right: .2rem;
		}

		.tag {
			padding-left: .2rem;
			padding-right: .2rem;
		}
	}
}

.drop-down-btn {
	width: .7rem;
	height: .7rem;
	transition: all .5s;

}

.flip {
	transform: rotate(180deg);
	transition: all .5s;
}

.field-type {
	opacity: .6;
	font-style: italic;
}

input {
	background-color: #5f5;
}
</style>