<script setup lang="ts">
import { computed, ref } from 'vue';
import { I_Diagram } from '../core/avalanche-app/root-diagram/diagram/domain';
import { DiagramType } from '../core/general/domain';
import AddNewDiagram from './controls/AddNewDiagram.vue';

const props = defineProps<{
	modelValue: number
	diagrams: I_Diagram[]
}>()

const emit = defineEmits<{
	(e: "update:modelValue", selectedDiagram: number): void
	(e: "new:diagram", name: string, diagramType: DiagramType): void
}>()

const selectedDiagram = computed({
	get(): number { return props.modelValue },
	set(value: number) { emit("update:modelValue", value) }
})

function addNewDiagram(name: string, diagramType: DiagramType) {
	emit("new:diagram", name, diagramType)
}

</script>

<template>
	<div class="tabs-strip">
		<div class="tabs-strip-row">
			<div v-for="x, i in props.diagrams" key="i"
				:class="`tab tab-${x.diagramType.toLowerCase()} ${selectedDiagram == i ? 'selected' : ''}`"
				@pointerdown="selectedDiagram = i">
				<div class="tab-body">
					<div>
						{{ x.name }}
					</div>
					<div class="diagramType">
						({{ x.diagramType }} diagram)
					</div>
				</div>
			</div>
			<div class="tab tab-new">
				<div>
					<AddNewDiagram @confirm="addNewDiagram" />
				</div>
			</div>
			<!-- <div :class="`tab ${selectedDiagram == 0 ? 'selected' : ''}`" @click="selectedDiagram = 0">Blocks</div>
        <div :class="`tab ${selectedDiagram == 1 ? 'selected' : ''}`" @click="selectedDiagram = 1">Classes</div> -->
		</div>
	</div>
</template>

