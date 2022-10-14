<script setup lang="ts">
import { computed } from 'vue';
import { I_Diagram } from '../core/avalanche-app/root-diagram/diagram/domain';

const props = defineProps<{
    modelValue: number
    diagrams: I_Diagram[]
}>()

const emit = defineEmits<{
    (e: "update:modelValue", selectedDiagram: number): void
}>()

const selectedDiagram = computed({
    get(): number { return props.modelValue },
    set(value: number) { emit("update:modelValue", value) }
})

</script>

<template>
    <div class="tabs-main">
        <div class="tabs-row">
            <div v-for="x, i in props.diagrams" key="i"
                :class="`tab tab-${x.diagramType.toLowerCase()} ${selectedDiagram == i ? 'selected' : ''}`"
                @pointerdown="selectedDiagram = i">{{ x.diagramType }}<br/>{{ x.name }}</div>
            <!-- <div :class="`tab ${selectedDiagram == 0 ? 'selected' : ''}`" @click="selectedDiagram = 0">Blocks</div>
        <div :class="`tab ${selectedDiagram == 1 ? 'selected' : ''}`" @click="selectedDiagram = 1">Classes</div> -->
        </div>
    </div>
</template>

<style lang="scss">
@use '../styles/diagram.scss';

.tabs-main {
    display: flex;
    flex-direction: row;
    height: 2rem;

    .tabs-row {
        flex: 0 0 10rem;
        position: relative;
        display: flex;
        flex-direction: row;

        .tab {
            border-radius: .25rem .25rem 0 0;
            margin-left: .15rem;
            margin-right: .15rem;
            margin-top: .3rem;
            padding: .5rem;
            padding-top: .2rem;
            padding-bottom: .2rem;
            color: #000;
            font-size: .6rem;
            cursor: pointer;
            display: flex;
            flex-direction: row;
            align-items: center;
            text-align: center;
            box-shadow: 0 0 .1rem .068rem rgba(#000, .5);
            white-space: nowrap;
        }

        .selected {
            background-color: linear-gradient(#ccc, #777); //linear-gradient(0deg diagram.$class-color1 white);
            transform-origin: 0% 100%;
            position: relative;

            &::after{
                width: 0;
            content: "🢁";
            transform-origin: 50% 50%;
            position: absolute;
            transform-origin:  center;
            left: calc(50% - .6rem);
            bottom: -1.6rem;
            text-align: center;
            align-self: center;
            font-size: 1.2rem;
            }
        }

    }

    .tab-component {
        background-color: diagram.$component-color1;
    }

    .tab-class {
        background-color: diagram.$class-color1;
    }

    .tab-block {
        background-color: diagram.$block-color1;
    }

}
</style>