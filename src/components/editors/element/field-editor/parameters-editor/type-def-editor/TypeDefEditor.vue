<script setup lang="ts">
import { computed } from "vue";
import { I_TypeDef } from "../../../../../../core/avalanche-app/root-diagram/diagram/element/Field/type-def/domain";
import ValTypeSelector from "../../../../../controls/ValTypeSelector.vue";
import RefTypeSelector from "../../../../../controls/RefTypeSelector.vue";
import { TypeDef } from "../../../../../../core/avalanche-app/root-diagram/diagram/element/field/type-def/application";
import { I_Element } from "../../../../../../core/avalanche-app/root-diagram/diagram/element/domain";
import { DataType } from "../../../../../../core/general/domain";

const props = defineProps<{ modelValue: I_TypeDef }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_TypeDef): void
}>()

const typeDef = computed<I_TypeDef>({
	get: (): I_TypeDef => props.modelValue,
	set: (value: I_TypeDef) => {
		console.log('typeDef change');
		const _value= new TypeDef(value.key, value.fallbackDataType, value.refElement)
		emit("update:modelValue", _value)}
})

const fallbackDataType = computed<DataType>({
	get: (): DataType => props.modelValue.fallbackDataType,
	set: (value: DataType) => {
		console.log('typeDef change');
		emit("update:modelValue", new TypeDef(typeDef.value.key, value, typeDef.value.refElement))}
})

</script>

<template>
	<div class="typedef-editor_root">

		<table class="details-table">
			<tbody>
				<tr class="details-row">
					<td class="details-cell">
						<ValTypeSelector :id="`val-type-${typeDef.key}`" v-model="fallbackDataType" />
					</td>
					<td class="details-cell">
						<RefTypeSelector :id="`reg-type-${typeDef.key}`" v-model="typeDef.refElement" />
					</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>

<style scoped lang="scss">
.typedef-editor_root {

	.details-table {
		background-color: #555;
		border-collapse: collapse;

		.details-row {
			//			border: solid 1px green;
			padding: 0;

			.details-cell {
				padding: 0;
				//		border: solid 1px yellow;
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

.input {
	color: #ddd;
}
</style>