<script lang="ts" setup>
const { dx } = defineProps<{
    dx?: number
}>()
</script>

<template>
    <polygon points="-6,0 0,-6 6,0 0,6" class="in-port"
        :style="{ transform: `translate(${dx != undefined ? .6 + dx : .6}rem, .6rem)` }" />
</template>

<style scoped lang="scss">
.in-port {
    fill: #aaa;
    stroke: #444;
    stroke-width: 1;
}
</style>