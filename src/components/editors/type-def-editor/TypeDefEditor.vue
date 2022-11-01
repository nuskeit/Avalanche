<script setup lang="ts">
import { computed } from "vue";
import { I_TypeDef } from "../../../core/avalanche-app/root-diagram/diagram/element/Field/type-def/domain";
import { AppFactory } from "../../../core/factories/app-factory/application";
import { DataType } from "../../../core/general/domain";
import RefTypeSelector from "../../controls/RefTypeSelector.vue";
import ValTypeSelector from "../../controls/ValTypeSelector.vue";

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
	<div class="typedef-editor">

		<table class="details-table">
			<tbody>
				<tr class="details-row">
					<td class="details-cell">
						fallback: <ValTypeSelector :id="`val-type-${typeDef.key}`" v-model="fallbackDataType" />
					</td>
					<td class="details-cell">
						ref?: <RefTypeSelector :id="`reg-type-${typeDef.key}`" v-model="typeDef.refElement" />
					</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>

