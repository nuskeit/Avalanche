import { I_Presenter, ViewBox, ViewPort } from "../../core/general/presenter"
import { I_Grid, I_GridColumn, I_GridRow } from "../../core/avalanche-app/root-diagram/diagram/grid/domain"

export class GridPresenter implements I_Presenter<Grid>{
	grid: I_Grid

	readonly gridLabelsPosition = {
		columns: { dx: 5, dy: 0 },
		rows: { dx: 0, dy: 20 },
	}

	constructor(grid: I_Grid) {
		this.grid = grid
	}








	proxy: Function = () => { }
	delegates: {} = {}
	eventsHandler: {} = {}



}

export class Grid implements I_Grid {
	readonly cols: GridColumn[]
	readonly rows: GridRow[]
	readonly viewBox: ViewBox
	readonly viewPort: ViewPort

	constructor(
		viewBox: ViewBox,
		viewPort: ViewPort
	) {
		this.viewBox = viewBox
		this.viewPort = viewPort
		this.cols = []
		this.rows = []
	}

	addColumn(c: GridColumn): void {
		this.cols.push(c)
	}

	addRow(r: GridRow): void {
		this.rows.push(r)
	}

	drawGrid() {
		let maxX = 0
		if (this.gridRatio > 1.7) {
			maxX = this.viewBox.height * this.gridRatio
		} else {
			maxX = this.viewBox.width
		}

		let maxY = 0
		if (this.gridRatio <= 1.7) {
			maxY = this.viewBox.width / this.gridRatio
		} else {
			maxY = this.viewBox.height
		}
		maxX *= 1.2
		maxY *= 1.2
		this.drawCols(maxX, maxY)
		this.drawRows(maxX, maxY)
	}

	get gridRatio(): number {
		return this.viewPort.width / this.viewPort.height
	}

	private drawCols(maxX: number, maxY: number) {
		const colWidth: number = 100
		const offsetX = this.viewBox.x
		const safetyRenderMarginX = this.viewBox.width / 10
		const start = offsetX - safetyRenderMarginX
		let end = maxX
		end += offsetX

		this.cols.length = 0
		for (let i = start; i < end; i += colWidth) {
			const rest = i % colWidth
			if (rest > 0 && i - rest == 0) continue
			this.cols.push(
				new GridColumn(i - rest, this.viewBox.y, this.viewBox.y + maxY)
			)
		}
	}

	private drawRows(maxX: number, maxY: number) {
		const rowHeight: number = 100
		const offsetY = this.viewBox.y
		const safetyRenderMarginY = this.viewBox.height / 10
		const start = offsetY - safetyRenderMarginY
		let end = maxY
		end += offsetY

		this.rows.length = 0
		for (let i = start; i < end; i += rowHeight) {
			const rest = i % rowHeight
			if (rest > 0 && i - rest == 0) continue
			this.rows.push(
				new GridRow(i - rest, this.viewBox.x, this.viewBox.x + maxX)
			)
		}
	}

	get horizontalRulerOffsetY() {
		return this.viewBox.y + 20
	}

	get verticalRulerOffsetX() {
		return this.viewBox.x + 20
	}
}

export class GridColumn implements I_GridColumn {
	readonly x: number
	readonly y1: number
	readonly y2: number

	constructor(
		x: number,
		y1: number,
		y2: number
	) {
		this.x = x
		this.y1 = y1
		this.y2 = y2
	}

	get label(): string { return this.x.toFixed(0) }
}


export class GridRow implements I_GridRow {
	readonly y: number
	readonly x1: number
	readonly x2: number

	constructor(
		y: number,
		x1: number,
		x2: number
	) {
		this.y = y
		this.x1 = x1
		this.x2 = x2
	}

	get label(): string { return this.y.toFixed(0) }
}


