<script lang="ts" setup >

import { computed } from 'vue';
import { RelationshipType } from '../../core/general/domain';

const props = defineProps<{
	id: string
	modelValue: RelationshipType
}>()

const emit = defineEmits<{
	(e: "update:modelValue", refKey: RelationshipType): void
}>()

const value = computed<RelationshipType>({
	get: (): RelationshipType => props.modelValue,
	set: (value: RelationshipType) => emit("update:modelValue", value)
})

</script>

<template>
	<select :id="props.id" v-model="value">
		<option :value="null" disabled>Select...</option>
		<option v-for="x, i in RelationshipType" key="i" :value="x">
			{{ x }}
		</option>
	</select>
</template>
