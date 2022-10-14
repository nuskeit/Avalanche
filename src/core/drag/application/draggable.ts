import { I_Vector } from "../../general/domain"
import { I_Draggable } from "../domain"

export class Draggable<T> implements I_Draggable<T> {
	element: T
	location: I_Vector

	constructor(
		element: T,
		location: I_Vector
	) {
		this.element = element
		this.location = location
	}

	toJSON() {
		return {
			__type: "Draggable",
			...this
		}
	}
}
