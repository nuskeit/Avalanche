<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { FieldType, FieldTypeDTO } from '../../../../avalanche-core';
import { useSystemData } from '../../repo/useSystemData';

const props = defineProps<{
    modelValue: FieldType,
    id: string
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: FieldType): void
}>()

const fieldType = computed<FieldType>({
    get: (): FieldType => props.modelValue,
    set: (value: FieldType) => emit("update:modelValue", value)
})

const { getFieldTypes } = useSystemData()

const fieldTypes = ref<FieldTypeDTO[]>()

onMounted(async () => {
    fieldTypes.value = getFieldTypes()
})

</script>

<template>
    <select :id="id" v-model="fieldType">
        <option :value="null" disabled>Select...</option>
        <option v-for="x, i in fieldTypes" key="i" :value="x['key']">{{ x['value'] }}</option>
    </select>

</template>