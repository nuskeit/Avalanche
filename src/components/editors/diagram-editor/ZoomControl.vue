<script setup lang="ts">
const props = defineProps<{
	percentage: string
}>()

const emit = defineEmits<{
	(e: "zoomIn"): void
	(e: "zoomOut"): void
}>()
</script>

<template>
	<div class="zoom">
		<div @pointerdown="emit('zoomOut')" class="zoom-btn">
			-
		</div>
		<div class="zoom-label">
			{{ props.percentage }}
		</div>
		<div @pointerdown="emit('zoomIn')" class="zoom-btn">
			+
		</div>
	</div>
</template>
