<script setup lang="ts">
import { computed } from 'vue';
import {
    BlockEntity, ClassEntity, ComponentEntity, DiagramToolbox,
    EnumEntity, InterfaceEntity, I_Diagram, I_Element
} from '../../../../avalanche-core';

const props = defineProps<{
    modelValue: I_Diagram
    x: number
    y: number
}>()

const emit = defineEmits<{
    (e: 'update:modelValue', diagram: I_Diagram): void
}>()

const diagram = computed<I_Diagram>({
    get(): I_Diagram { return props.modelValue },
    set(value: I_Diagram) { emit('update:modelValue', value) }
})

const diagramToolbox: DiagramToolbox = new DiagramToolbox()

const addComponent = (el: I_Element): void => {
    el.name = `${el.elementType} ${el.key}`
    el.visible = true
    diagram.value.addElement(el)
}

function addComponentHandler() {
    const pe: I_Element = new ComponentEntity()
    addComponent(pe)
}

function addBlockHandler() {
    const pe: I_Element = new BlockEntity()
    addComponent(pe)
}

function addClassHandler() {
    const pe: I_Element = new ClassEntity()
    addComponent(pe)
}

function addInterfaceHandler() {
    const pe: I_Element = new InterfaceEntity()
    addComponent(pe)
}

function addEnumHandler() {
    const pe: I_Element = new EnumEntity()
    addComponent(pe)
}

</script>

<template>
    <div class="diagram-toolbox-root">
        <div class="diagram-toolbox-title">
            <div>
                Toolbox
            </div>
        </div>
        <div class="row" @click="addComponentHandler"
            v-show="diagramToolbox.checkElementDiagramCompatibility('keyAddComponent', diagram.diagramType)">
            <div>
                Add Component
            </div>
        </div>
        <div class="row" @click="addBlockHandler"
            v-show="diagramToolbox.checkElementDiagramCompatibility('keyAddBlock', diagram.diagramType)">
            <div>
                Add Block
            </div>
        </div>
        <div class="row" @click="addClassHandler"
            v-show="diagramToolbox.checkElementDiagramCompatibility('keyAddClass', diagram.diagramType)">
            <div>
                Add Class
            </div>
        </div>
        <div class="row" @click="addInterfaceHandler"
            v-show="diagramToolbox.checkElementDiagramCompatibility('keyAddInterface', diagram.diagramType)">
            <div>
                Add Interface
            </div>
        </div>
        <div class="row" @click="addEnumHandler"
            v-show="diagramToolbox.checkElementDiagramCompatibility('keyAddEnum', diagram.diagramType)">
            <div>
                Add Enum
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.diagram-toolbox-root {
    user-select: none;
    position: absolute;
    right: 1rem;
    top: 15rem;
    width: 10rem;

    .diagram-toolbox-title {
        background-color: #000;
        color: #ddd;
        font-size: 1.2rem;
        font-weight: bold;
    }

    .row {
        background-color: #888;
        height: 1.2rem;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        align-items: center;
        align-content: center;
        border-radius: .1rem;
        border: solid .1rem #444;

        &>div {
            height: 100%;
            display: flex;
            flex-direction: row;
            align-items: center;
            font-size: .9rem;
            font-weight: bold;
        }
    }

    .row:hover {
        background-color: #6f6;
        color: #000;
    }

}
</style>