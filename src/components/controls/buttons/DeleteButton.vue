<script lang="ts" setup>
	import Button from "./Button.vue";
	
	const props = defineProps<{
		className?: string
	}>()
	
	const emit = defineEmits<{
		(e: 'click'): void
	}>()
	
	</script>
	
	<template>
		<Button>
			<img class="btn" @click="()=>emit('click')" src="../../../assets/buttons/ex.png" :class="props.className" />
		</Button>
	</template>
	