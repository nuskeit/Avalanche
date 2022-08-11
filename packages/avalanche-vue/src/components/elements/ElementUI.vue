<script setup lang="ts">
import { computed } from 'vue';
import {
    elementWidth, I_DraggableWrapper, I_Element, rowHeight
} from '../../../../avalanche-core';
import ElementTemplate from './ElementTemplate.vue';
import Field from './Field.vue';

const props = defineProps<{
    modelValue: I_DraggableWrapper<I_Element>,
    selected: boolean
}>();

const emit = defineEmits<{
    (e: 'update:modelValue', draggableElement: I_DraggableWrapper<I_Element>): void
}>()

const draggableElement = computed<I_DraggableWrapper<I_Element>>({
    get: (): I_DraggableWrapper<I_Element> => props.modelValue,
    set: (value: I_DraggableWrapper<I_Element>) => {
        console.log('draggableElement', value);
        emit("update:modelValue", value)
    }
})


</script>

<template>
    <ElementTemplate :draggableElement="draggableElement">
        <!--:selected="selected"> -->
        <Field :x="0" :y="16 + rowHeight * i" :width="elementWidth" v-for="(x, i) in draggableElement.element.fields"
            :text="x.text" :key="x.key" :showInPort="true" :showOutPort="true" :field="x" />
    </ElementTemplate>
</template>

<style scoped lang="scss">
@import "./element.scss";

* {
    user-select: none;
}
</style>
