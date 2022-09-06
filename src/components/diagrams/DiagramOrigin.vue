<template>
	<g class="origin-cross-wrapper">
		<circle cx="0" cy="0" r="10" class="origin-cross-circle-1" />
		<circle cx="0" cy="0" r="10" class="origin-cross-circle-2" />
		<line x1="-50" x2="-25" class="origin-cross-line" />
		<line x1="25" x2="50" class="origin-cross-line" />
		<line y1="-50" y2="-25" class="origin-cross-line" />
		<line y1="25" y2="50" class="origin-cross-line" />
		<line x1="-50" x2="-25" class="origin-cross-line-alt" />
		<line x1="25" x2="50" class="origin-cross-line-alt" />
		<line y1="-50" y2="-25" class="origin-cross-line-alt" />
		<line y1="25" y2="50" class="origin-cross-line-alt" />
	</g>
</template>


<style lang="scss" scoped>
.origin-cross-wrapper {
	opacity: .5;
	filter: drop-shadow(.05em .05em .03em rgb(0 0 0 / 1));


	.origin-cross-circle-1 {
		stroke: #000;
		stroke-width: 20;
		fill: none;
		//stroke-dasharray: 15.7;
	}

	.origin-cross-circle-2 {
		stroke: #ccc;
		fill: none;
		stroke-width: 20;
		stroke-dasharray: 15.7;
		stroke-dashoffset: 15.7;
	}

	.origin-cross-line {
		stroke: #ddd;
		stroke-dasharray: 13;
	}

	.origin-cross-line-alt {
		@extend .origin-cross-line;
		stroke: #000;
		stroke-dashoffset: 13;
	}
}
</style>