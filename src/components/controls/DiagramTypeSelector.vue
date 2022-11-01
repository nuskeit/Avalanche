<script lang="ts" setup >

import { computed } from 'vue';
import { DiagramType, undefinedToNull } from '../../core/general/domain';

const props = defineProps<{
	id?: string
	modelValue:  DiagramType
}>()

const emit = defineEmits<{
	(e: "update:modelValue", diagramType: DiagramType): void
}>()

const diagramType = computed<DiagramType>({
	get: (): DiagramType => undefinedToNull(props.modelValue),
	set: (value: DiagramType) => emit("update:modelValue", undefinedToNull(value))
})

</script>

<template>
	<select class="diagram-type-selector" :id="props.id" v-model="diagramType">
		<option v-for="x, i in DiagramType" key="i" :value="x">
			{{ x }}
		</option>
	</select>
</template>
