<script lang="ts" setup >

import { computed } from 'vue';
import { DataType } from '../../core/general/domain';

const props = defineProps<{
	id: string
	modelValue: DataType
}>()

const emit = defineEmits<{
	(e: "update:modelValue", refKey: DataType): void
}>()

const value = computed<DataType>({
	get: (): DataType => props.modelValue,
	set: (value: DataType) => emit("update:modelValue", value)
})

</script>

<template>
	<select :id="props.id" v-model="value">
		<option :value="null" disabled>Select...</option>
		<option v-for="x, i in DataType" key="i" :value="x">
			{{ x }}
		</option>
	</select>
</template>

<style lang="scss" scoped>
	select{
		font-size: inherit;
	}
</style>
