import { I_ViewBox, I_ViewPort } from "../../../../../general/domain"

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
	readonly viewBox: I_ViewBox
	readonly viewPort: I_ViewPort
	verticalRulerOffsetX: number
	horizontalRulerOffsetY: number
	drawGrid(): void
}
