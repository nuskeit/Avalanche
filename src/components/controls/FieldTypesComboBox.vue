<!-- <script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import * as fieldNS from "../../core/avalanche-app/root-diagram/diagram/element/field";
import * as typesNS from "../../core/general";
//import { useSystemData } from '../../repo/useSystemData';

const props = defineProps<{
	modelValue: typesNS.domain.FieldType,
	id: string
}>()

const emit = defineEmits<{
	(e: "update:modelValue", value: typesNS.domain.FieldType): void
}>()

const fieldType = computed<typesNS.domain.FieldType>({
	get: (): typesNS.domain.FieldType => props.modelValue,
	set: (value: typesNS.domain.FieldType) => emit("update:modelValue", value)
})

//const { getFieldTypes } = useSystemData()

const fieldTypes = ref<FieldTypeDTO[]>()

onMounted(async () => {
	//  fieldTypes.value = getFieldTypes()
})

</script>

<template>
	<select :id="id" v-model="fieldType">
		<option :value="null" disabled>Select...</option>
		<option v-for="x, i in fieldTypes" key="i" :value="x['key']">{{  x['value']  }}</option>
	</select>

</template> -->