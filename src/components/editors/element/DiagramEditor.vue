<script setup lang="ts">
import { computed } from "vue";
import { I_Diagram } from "../../../core/avalanche-app/root-diagram/diagram/domain";
import TextBox from '../../controls/TextBox.vue';

const props = defineProps<{
	modelValue: I_Diagram
}>()

const emit = defineEmits<{
	(e: "update:modelValue", payload: I_Diagram): void
}>()

const diagram = computed<I_Diagram>({
	get: (): I_Diagram => {
		return props.modelValue
	},
	set: (value: I_Diagram) => {
		emit("update:modelValue", value)
	}
})

</script>

<template>
	<div class="element-editor_root form">
		<div class="header">
			<div class="element-name">
				<TextBox :id="`${diagram.key}`" v-model="diagram.name" />
			</div>
			<div class="element-type">
				send fruit
			</div>
		</div>

		<div class="listing">
			<div class="element-editor_row listing-item">
				<div>send fruit</div>
			</div>
		</div>

	</div>
</template>

<style scoped lang="scss">
.element-editor_root {

	background-color: #333e;
	box-shadow: .2rem .2rem .2rem rgba(#000, .5);
	padding: 0;
	color: #ddd;
	font-size: .7rem;

	.header {
		display: flex;
		flex-direction: row;
		background-color: #444;
		align-items: center;

		.element-name {
			text-align: left;
			white-space: nowrap;
			flex: 1 1 auto;
			cursor: pointer;
		}

		.element-type {
			white-space: nowrap;
			flex: 1 1 .1rem;
		}
	}

	.listing {

		.listing-item {
			cursor: pointer;
		}
	}


	.element-editor_row {
		display: flex;
		flex-direction: row;
		padding: 0;
		border-top: solid #555 .01rem;
		white-space: nowrap;
		//overflow: hidden;

		button {
			background-color: #555;
			color: #5af;
		}

		.action-button {
			width: 100%;
		}
	}

	.new {
		background-color: #0a5;
		height: .4rem;

	}

	.active {
		height: unset;
	}

	// 	&:nth-last-child(1) {
	// 		border: none
	// 	}

	// 	.element-editor_cell {
	// 		display: flex;
	// 		flex-direction: row;
	// 		align-items: center;

	// 	}

	// 	.editable {
	// 		background: rgba(#03a, .2);
	// 		border: solid .1rem rgba(#03a, .2);
	// 		padding-left: .2rem;
	// 		padding-right: .2rem;
	// 	}

	// 	.tag {
	// 		padding-left: .2rem;
	// 		padding-right: .2rem;
	// 	}
	// }

}
</style>