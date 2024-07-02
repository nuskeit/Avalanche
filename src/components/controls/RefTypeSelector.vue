<script lang="ts" setup >

import { computed, inject } from 'vue';
import { I_Element, I_ElementsStore } from '../../core/element/domain';
import { Nullable, undefinedToNull } from '../../core/general/domain';

const props = defineProps<{
	id: string
	modelValue: Nullable<I_Element>
}>()

const elementsStore = inject<I_ElementsStore>("elements-store")

const emit = defineEmits<{
	(e: "update:modelValue", refElement: Nullable<I_Element>): void
}>()

const refTypeValue = computed<Nullable<string>>({
	get: (): Nullable<string> => undefinedToNull(props.modelValue?.key),
	set: (key: Nullable<string>) => emit("update:modelValue", key == null ? null : undefinedToNull(elementsStore?.elements[key]))
})

</script>

<template>
	<select :id="props.id" v-model="refTypeValue">
		<option :value="null"></option>
		<option v-for="x, i in elementsStore?.elements" key="i" :value="x.key">
			{{ x.name }} ({{ x.elementType.substring(0, 1) }})
		</option>
	</select>
</template>
