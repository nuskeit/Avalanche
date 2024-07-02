<script lang="ts" setup>
import { onActivated, onMounted } from 'vue';
import { I_Grid } from '../../core/diagram/grid/domain';
import { preseter } from '../../core/general';
import { GridPresenter } from './grid-presenter';

const props = defineProps<{
	grid: I_Grid
}>()

const presenter: GridPresenter = new GridPresenter({ presenterProxy: () => presenter, gridProxy: () => props.grid })


onMounted(async () => {
	presenter.gridProxy.drawGrid()
})

</script>

<template>
	<g class="grid">
		<g v-for="e, i in presenter.gridProxy.cols">
			<line :x1="e.x" :x2="e.x" :y1="e.y1" :y2="e.y2" class="grid-line" />
			<text :x="e.x" :y="presenter.gridProxy.horizontalRulerOffsetY" class="grid-text">
				<tspan :dx="presenter.gridLabelsPosition.columns.dx" :dy="presenter.gridLabelsPosition.columns.dy">{{
						e.label
				}}</tspan>
			</text>
		</g>
		<g v-for="e, i in presenter.gridProxy.rows">
			<line :x1="e.x1" :x2="e.x2" :y1="e.y" :y2="e.y" class="grid-line" />
			<text :x="presenter.gridProxy.verticalRulerOffsetX" :y="e.y" class="grid-text">
				<tspan :dx="presenter.gridLabelsPosition.rows.dx" :dy="presenter.gridLabelsPosition.rows.dy">{{
						e.label
				}}</tspan>
			</text>
		</g>
	</g>
</template>

