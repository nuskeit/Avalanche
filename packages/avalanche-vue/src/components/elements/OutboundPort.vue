<script lang="ts" setup>
import { elementWidth } from '../../../../avalanche-core';

const { dx } = defineProps<{
    dx?: number
}>()

</script>

<template>
    <circle :cx="elementWidth + 5" cy="0" r="5" class="out-port"
        :style="{ transform: `translate(${dx != undefined ? -.9 + dx : -.9}rem, .6rem)` }" />
</template>

<style scoped lang="scss">
.out-port {
    fill: #aaa;
    stroke: #444;
    stroke-width: 1;
}
</style>