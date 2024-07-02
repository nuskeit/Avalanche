<script setup lang="ts">
import { computed, reactive } from 'vue';
import { I_Draggable } from '../../core/drag/domain';
import { I_DraggableElement } from '../../core/drag/domain/draggable-element';
import { I_Element } from '../../core/element/domain';
import ElementTemplate from './ElementTemplate.vue';
import Field from './Field.vue';
import { ElementPresenter } from './element-presenter';

const props = defineProps<{
	modelValue: I_DraggableElement,
	selected: boolean
}>();

const emit = defineEmits<{
	(e: 'update:modelValue', draggableElement: I_Draggable<I_Element>): void
}>()

const draggableElement = computed<I_DraggableElement>({
	get: (): I_DraggableElement => props.modelValue,
	set: (value: I_DraggableElement) => {
		emit("update:modelValue", value)
	}
})

const presenter: ElementPresenter = reactive<ElementPresenter>(
	new ElementPresenter(
		{
			elementProxy: () => draggableElement.value,
			presenterProxy: () => presenter
		})
)


</script>

<template>

	<ElementTemplate :draggableElement="presenter.elementProxy" :selected="props.selected">

		<!-- <EnumField :x="0" :y="16 + rowHeight * i" :width="elementWidth"
			v-if="props.modelValue.element.elementType == ElementType.Enum"
			v-for="(x, i) in draggableElement.element.fields" :text="x.description" :key="Math.random()"
			:showInPort="true" :showOutPort="true" :field="x" />

		<Field :index="i" :width="elementWidth"
			v-if="props.modelValue.element.elementType != ElementType.Enum"
			v-for="(x, i) in draggableElement.element.fields" :key="Math.random()"
			:showInPort="true" :showOutPort="true" :field="x" /> -->

		<Field :index="i" :width="draggableElement.size.width" v-for="(x, i) in draggableElement.element.fields"
			:key="Math.random()" :field="x" />

	</ElementTemplate>
</template>
