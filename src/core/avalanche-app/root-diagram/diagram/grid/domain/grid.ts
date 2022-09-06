export interface I_GridColumn {
	readonly x: number
	readonly y1: number
	readonly y2: number
	readonly label: string
}

export interface I_GridRow {
	readonly y: number
	readonly x1: number
	readonly x2: number
	readonly label: string
}


export interface I_Grid {
	readonly cols: I_GridColumn[]
	readonly rows: I_GridRow[]
	verticalRulerOffsetX: number
	horizontalRulerOffsetY: number
	drawGrid(): void
}
