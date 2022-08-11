<script lang="ts" setup>
import { I_Vector } from '../../../../avalanche-core';

const emit = defineEmits<{
    (e: "navigate", payload: I_Vector): void
}>()

</script>

<template>
    <g class="navigation-root">
        <rect class="navigation-buttons" x="0" y="0" width="20" height="20" fill="lime"
            @click="emit('navigate', { x: -1, y: -1 })" />up left
        <rect class="navigation-buttons" x="20" y="0" width="20" height="20" fill="blue"
            @click="emit('navigate', { x: 0, y: -1 })" />up
        <rect class="navigation-buttons" x="40" y="0" width="20" height="20" fill="purple"
            @click="emit('navigate', { x: 1, y: -1 })" />up right
        <rect class="navigation-buttons" x="0" y="20" width="20" height="20" fill="#f4a"
            @click="emit('navigate', { x: -1, y: 0 })" />left
        <rect class="navigation-buttons" x="20" y="20" width="20" height="20" fill="green"
            @click="emit('navigate', { x: 0, y: 0 })" />center
        <rect class="navigation-buttons" x="40" y="20" width="20" height="20" fill="red"
            @click="emit('navigate', { x: 1, y: 0 })" />right
        <rect class="navigation-buttons" x="0" y="40" width="20" height="20" fill="violet"
            @click="emit('navigate', { x: -1, y: 1 })" />down left
        <rect class="navigation-buttons" x="20" y="40" width="20" height="20" fill="orange"
            @click="emit('navigate', { x: 0, y: 1 })" />down
        <rect class="navigation-buttons" x="40" y="40" width="20" height="20" fill="grey"
            @click="emit('navigate', { x: 1, y: 1 })" />down left
    </g>
</template>

<style lang="scss" scoped>
.navigation-root {
    background-color: red;

    .navigation-buttons {
        cursor: pointer;
    }

}
</style>