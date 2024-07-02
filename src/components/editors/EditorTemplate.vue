<script setup lang="ts">
const props = defineProps<{
	title: string
}>()

</script>

<template>
	<div class="editor-root form">
		<div class="editor-top editor-title">
			{{ props.title }}
		</div>
		<div class="editor-bottom">
			<slot></slot>
		</div>
	</div>
</template>
	