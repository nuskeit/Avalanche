<script setup lang="ts">
import { computed } from "vue";
import { I_Parameter } from "../../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import TextBox from '../../../../controls/TextBox.vue';
import RefTypeSelector from '../../../../controls/RefTypeSelector.vue';
import ValTypeSelector from '../../../../controls/ValTypeSelector.vue';

const props = defineProps<{
	index: number
	modelValue: I_Parameter
	action: "add" | "delete"
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: I_Parameter): void
	(e: "actionButtonClick", index: number, value: I_Parameter): void
}>()

const parameter = computed<I_Parameter>({
	get: (): I_Parameter => props.modelValue,
	set: (value: I_Parameter) => emit("update:modelValue", value)
})

function actionButtonHandler() {
	emit('actionButtonClick', props.index, parameter.value)
}

</script>

<template>
	<div class="group">
		<div class="row">
			<TextBox v-model="parameter.name" :id="parameter.name" />
		</div>
		<div class="row">
			<div class="details-cell">
				<ValTypeSelector :id="`val-type-${parameter.key}`" v-model="parameter.dataTypeDef.fallbackDataType" />
			</div>
			<div class="details-cell">
				<RefTypeSelector :id="`reg-type-${parameter.key}`" v-model="parameter.dataTypeDef.refElement" />
			</div>
			<div class="details-cell">
				<div @click="actionButtonHandler" class="action-button"> {{action=='add'?'+':'-'}}</div>
			</div>
		</div>
	</div>
</template>

<style scoped lang="scss">
.group {
	//			border: solid 1px green;
	padding: 0;
	display: flex;
	flex-direction: column;
	// border-bottom: dashed .05rem #aaa;
	margin-bottom: .2rem;
	background-color: #000;

	&:nth-last-child(1) {
		border-bottom: none;

	}

	.row {
		display: flex;
		flex-direction: row;
	}

	.details-cell {
		padding: .03rem;
		//		border: solid 1px yellow;
		text-align: left;
		vertical-align: top;
		height: 1rem;

		.action-button {
			box-sizing: border-box;
			width: 1rem;
			// height: .93rem;
			height: 100%;
			text-align: center;
			border: solid .01rem #777;
		}
	}

}
</style>