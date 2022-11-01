<script lang="ts" setup>

const props = defineProps<{
	className?: string
}>()

const emit = defineEmits<{
	(e: 'click'): void
}>()

</script>
	
<template>
	<img class="btn" @click="()=>emit('click')" src="../../../assets/buttons/ex.png" :class="props.className" />
</template>
	