<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
	modelValue: string,
	id: string
	style?: {}
	className?: string
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
	<input :class="`${props.className}`" placeholder="..." :id="props.id" v-model="text" :style="props.style">
</template>
