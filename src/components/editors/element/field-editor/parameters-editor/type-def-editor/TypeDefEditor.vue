<script setup lang="ts">
import { computed } from "vue";
import { I_TypeDef } from "../../../../../../core/avalanche-app/root-diagram/diagram/element/Field/type-def/domain";
import ValTypeSelector from "../../../../../controls/ValTypeSelector.vue";
import RefTypeSelector from "../../../../../controls/RefTypeSelector.vue";

const props = defineProps<{ modelValue: I_TypeDef }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_TypeDef): void
}>()

const typeDef = computed<I_TypeDef>({
	get: (): I_TypeDef => props.modelValue,
	set: (value: I_TypeDef) => emit("update:modelValue", value)
})

</script>

<template>
	<div class="typedef-editor_root">

		<table class="details-table">
			<tbody>
				<tr class="details-row">
					<td class="details-cell">
						<ValTypeSelector :id="`val-type-${typeDef.key}`" v-model="typeDef.fallbackDataType" />
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