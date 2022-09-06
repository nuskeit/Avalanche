<script lang="ts" setup>
import { onMounted } from 'vue';
import { I_Grid } from '../../core/avalanche-app/root-diagram/diagram/grid/domain';
import { GridPresenter } from './grid-presenter';

const props = defineProps<{
	grid: I_Grid
}>()

const presenter = new GridPresenter(props.grid)

onMounted(async () => {
	setTimeout(() => presenter.grid.drawGrid(), 20)
})

</script>

<template>
	<g>
		<g v-for="e, i in presenter.grid.cols">
			<line :x1="e.x" :x2="e.x" :y1="e.y1" :y2="e.y2" class="grid-line" />
			<text :x="e.x" :y="presenter.grid.horizontalRulerOffsetY" class="grid-text">
				<tspan :dx="presenter.gridLabelsPosition.columns.dx" :dy="presenter.gridLabelsPosition.columns.dy">{{
						e.label
				}}</tspan>
			</text>
		</g>
		<g v-for="e, i in presenter.grid.rows">
			<line :x1="e.x1" :x2="e.x2" :y1="e.y" :y2="e.y" class="grid-line" />
			<text :x="presenter.grid.verticalRulerOffsetX" :y="e.y" class="grid-text">
				<tspan :dx="presenter.gridLabelsPosition.rows.dx" :dy="presenter.gridLabelsPosition.rows.dy">{{
						e.label
				}}</tspan>
			</text>
		</g>
	</g>
</template>

<style lang="scss" scoped>
.grid-line {
	stroke: #0006;
	stroke-width: .5;
	stroke-dasharray: 4
}

.grid-text {
	fill: #0006;
	font-size: 13px;
}
</style>