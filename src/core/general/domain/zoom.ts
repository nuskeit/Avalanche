import { I_ViewBox } from "./view-box"
import { I_ViewPort } from "./view-port"

export interface I_Zoom {
	factor: number
	readonly minFactor: number
	readonly maxFactor: number
	readonly percentage: number

	zoomIn(viewBox: I_ViewBox, viewPort: I_ViewPort): void

	zoomOut(viewBox: I_ViewBox, viewPort: I_ViewPort): void

	zoomReset(viewBox: I_ViewBox, viewPort: I_ViewPort): void

	doZoom(viewBox: I_ViewBox, viewPort: I_ViewPort): void
}