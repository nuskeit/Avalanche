<script setup lang="ts">
import { computed, reactive } from "vue";
import { MethodField } from "../../../../core/avalanche-app/root-diagram/diagram/element/field/application";
import { I_Field } from "../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { FieldType } from "../../../../core/general/domain";
import TextBox from '../../../controls/TextBox.vue';
import { FieldEditorPresenter } from "./field-editor-presenter";
import ParametersEditor from "./parameters-editor/ParametersEditor.vue";
import TypeDefEditor from "./parameters-editor/type-def-editor/TypeDefEditor.vue";

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
				<TextBox :id="field.key" v-model="field.name" :className="'shy-input'" />
			</div>

			<div class="cell right field-type">
				{{ field.fieldType }}
			</div>

			<div class="cell toggle-btn">
				<img :class="`drop-down-btn ${presenter.expand ? 'flip' : ''}`"
					src="./../../../../assets/drop-down-ico.png" @pointerdown="presenter.eventsHandler.toggleExpand">
			</div>

		</div>

		<table v-if="presenter.expand" class="details-table">
			<tbody>

				<tr class="details-row">
					<td class="details-cell">
						<!-- <FieldTypesComboBox :id="field.id.toString()" v-model="field.fieldType" /> -->
						Text
					</td>
					<td class="details-cell">
						<!-- <label :for="`text-${field.id.toString()}`">Text:</label> -->
						<TextBox :id="field.key" v-model="field.text" :className="'regular-input'" />
						<TypeDefEditor v-model="field.dataTypeDef" />
					</td>
				</tr>

				<tr class="details-row" v-if="presenter.field.fieldType == FieldType.Method">
					<td class="details-cell">
						Parameters
					</td>
					<td class="details-row field-type">
						<ParametersEditor v-model="(presenter.field as MethodField).parameters" />
					</td>
				</tr>

			</tbody>
		</table>

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
	width: 100%;

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
			//border: solid white 1px;
			flex: 1 1 auto;
		}

		.toggle-btn{
			flex: 0 0 1rem;
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




	.details-table {
		background-color: #555;
		border-collapse: collapse;

		.details-row {
//border:solid 1px red;
padding: 0;
			.details-cell {
				padding: 0;
//				border:solid 1px blue;
				text-align: left;
				vertical-align: top;

				&>input {
					border: none;
					background-color: #444;
				}
			}
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
	// border: solid white 1px;
}

input {
	background-color: #5f55;
	color: #ddd;
}


.regular-input {
	background-color: #ddd;
}

.shy-input {
	background-color: #0000;
}
</style>