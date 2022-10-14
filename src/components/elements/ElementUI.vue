<script setup lang="ts">
import { computed } from 'vue';
import { I_Element } from '../../core/avalanche-app/root-diagram/diagram/element/domain';
import { I_Draggable } from '../../core/drag/domain';
import { elementWidth, rowHeight } from '../../core/general/domain/constants';
import ElementTemplate from './ElementTemplate.vue';
import Field from './Field.vue';

const props = defineProps<{
	modelValue: I_Draggable<I_Element>,
	selected: boolean
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', draggableElement: I_Draggable<I_Element>): void
}>()

const draggableElement = computed<I_Draggable<I_Element>>({
	get: (): I_Draggable<I_Element> => props.modelValue,
	set: (value: I_Draggable<I_Element>) => {
		emit("update:modelValue", value)
	}
})

</script>

<template>
	<ElementTemplate :draggableElement="draggableElement" :selected="props.selected">
		<Field :x="0" :y="16 + rowHeight * i" :width="elementWidth" v-for="(x, i) in draggableElement.element.fields"
			:text="x.description" :key="Math.random()" :showInPort="true" :showOutPort="true" :field="x" />
	</ElementTemplate>
</template>

<style scoped lang="scss">
* {
	user-select: none;
}
</style>
