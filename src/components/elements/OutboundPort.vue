<script lang="ts" setup>

const props = defineProps<{
    x: number
}>()

</script>

<template>
    <circle :cx="props.x + 5" cy="0" r="5" class="out-port"
        :style="{ transform: `translate(${-15}px, .6rem)` }" />
</template>

<style scoped lang="scss">
.out-port {
    fill: #aaa;
    stroke: #444;
    stroke-width: 1;
}
</style>