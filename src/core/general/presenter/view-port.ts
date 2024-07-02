import { I_Serializable, I_Vector, I_ViewPort } from "../domain"

export class ViewPort implements I_ViewPort, I_Vector, I_Serializable {
	x: number
	y: number
	width: number
	height: number

	constructor(
		x: number,
		y: number,
		width: number,
		height: number
	) {
		this.x = x
		this.y = y
		this.width = width
		this.height = height
	}

	toJSON() {
		return {
			__type: "ViewPort",
			...this
		}
	}
}
