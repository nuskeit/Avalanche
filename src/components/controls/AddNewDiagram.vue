<script lang="ts" setup>

import { ref } from 'vue';
import { DiagramType } from '../../core/general/domain';
import AddButton from './buttons/AddButton.vue';
import CancelButton from './buttons/CancelButton.vue';
import ConfirmButton from './buttons/ConfirmButton.vue';
import DiagramTypeSelector from './DiagramTypeSelector.vue';
import TextBox from './TextBox.vue';

// const props = withDefaults(defineProps<{
// 	diagramType: DiagramType
// 	name: string
// }>(), {
// 	diagramType: DiagramType.Class,
// 	name: ""
// })


const emit = defineEmits<{
	(e: "confirm", name: string, diagramType: DiagramType): void
	(e: "update:diagramType", diagramType: DiagramType): void
	(e: "update:name", name: string): void
}>()

const name = ref<string>("")
const diagramType = ref<DiagramType>(DiagramType.Class)
const expand = ref<boolean>(false)

function reset() {
	name.value = ""
	diagramType.value = DiagramType.Class
	expand.value = false
}

function confirm() {
	const auxName = name.value.trim()
	if (auxName == "") return
	emit("confirm", auxName, diagramType.value)
	reset()
}

</script>
<template>
	<div class="add-new-diagram" v-if="!expand">
		<div>
			<AddButton @click="expand = !expand" />
		</div>
	</div>
	<div class="add-new-diagram" v-if="expand">
		<div class="row margin-bottom">
			<TextBox v-model="name" :class="'name'" v-bind:class="name" />
		</div>
		<div class="row">
			<div class="margin-right">
				<DiagramTypeSelector v-model="diagramType" :class="'selector'" />
			</div>
			<div class="margin-right">
				<ConfirmButton @click="confirm" />
			</div>
			<div>
				<CancelButton @click="reset" />
			</div>
		</div>
	</div>
</template>

