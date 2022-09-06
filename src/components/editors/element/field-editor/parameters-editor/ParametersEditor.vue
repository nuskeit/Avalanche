<script setup lang="ts">
import { computed } from "vue";
import { I_Parameter } from "../../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import TextBox from '../../../../controls/TextBox.vue';
import RefTypeSelector from '../../../../controls/RefTypeSelector.vue';
import ValTypeSelector from '../../../../controls/ValTypeSelector.vue';

const props = defineProps<{ modelValue: I_Parameter[] }>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_Parameter[]): void
}>()

const parameters = computed<I_Parameter[]>({
	get: (): I_Parameter[] => props.modelValue,
	set: (value: I_Parameter[]) => emit("update:modelValue", value)
})

</script>

<template>
	<div class="parameters-editor_root">

		<table class="details-table">
			<tbody>
				<tr class="details-row" v-for="p in parameters" :key="Math.random()">
					<td class="details-cell">
						<TextBox v-model="p.name" :id="p.name" class-name="input" />
					</td>
					<td class="details-cell">
						<ValTypeSelector :id="`val-type-${p.key}`" v-model="p.dataTypeDef.fallbackDataType" />
					</td>
					<td class="details-cell">
						<RefTypeSelector :id="`reg-type-${p.key}`" v-model="p.dataTypeDef.refElement" />
					</td>
				</tr>
			</tbody>
		</table>

	</div>
</template>

<style scoped lang="scss">
.parameters-editor_root {

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