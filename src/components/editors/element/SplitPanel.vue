<template>
	<div class="panel">
		<div class="top">
			<slot name="top"></slot>
		</div>
		<div class="bottom">
			<slot name="bottom"></slot>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.panel {
	display: flex;
	flex-direction: column;
	height: 100%;

	.top {
		flex: 0 0 50%;
		// background-color: red;
		overflow: auto;
	}

	.bottom {
		flex: 0 0 50%;
		// background-color: blue;
		overflow: auto;
	}
}
</style>