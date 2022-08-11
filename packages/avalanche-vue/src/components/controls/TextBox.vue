<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
    modelValue: string,
    id: string
}>()

const emit = defineEmits<{
    (e: "update:modelValue", value: string): void
}>()

const text = computed<string>({
    get: (): string => props.modelValue,
    set: (value: string) => emit("update:modelValue", value)
})

</script>

<template>
    <input class="control" placeholder="..." :id="id" v-model="text">
</template>

<style>
.control{
    width: 5rem;
    background: none;
    border: none;
}
</style>