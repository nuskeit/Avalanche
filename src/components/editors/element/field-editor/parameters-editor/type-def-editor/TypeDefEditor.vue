<script setup lang="ts">
import { computed } from "vue";
import { I_TypeDef } from "../../../../../../core/avalanche-app/root-diagram/diagram/element/Field/type-def/domain";
import { AppFactory } from "../../../../../../core/factories/app-factory/application";
import { DataType } from "../../../../../../core/general/domain";
import RefTypeSelector from "../../../../../controls/RefTypeSelector.vue";
import ValTypeSelector from "../../../../../controls/ValTypeSelector.vue";

const props = defineProps<{ modelValue: I_TypeDef }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_TypeDef): void
}>()

const typeDef = computed<I_TypeDef>({
	get: (): I_TypeDef => props.modelValue,
	set: (value: I_TypeDef) => {
		const _value = AppFactory.getSingleton().createTypeDef(value.fallbackDataType, value.refElement, value.key)
		emit("update:modelValue", _value)
	}
})

const fallbackDataType = computed<DataType>({
	get: (): DataType => props.modelValue.fallbackDataType,
	set: (value: DataType) => {
		emit("update:modelValue", AppFactory.getSingleton().createTypeDef(value, typeDef.value.refElement, typeDef.value.key))
	}
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
		background-color: #0002;
		border-collapse: collapse;
		border: solid 1px red;

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