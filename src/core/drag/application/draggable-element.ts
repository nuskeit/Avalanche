import { I_Element } from "../../avalanche-app/root-diagram/diagram/element/domain"
import { I_Vector, Size } from "../../general/domain"
import { I_DraggableElement } from "../domain/draggable-element"

export class DraggableElement implements I_DraggableElement {
	element: I_Element
	location: I_Vector
	size: Size

	constructor(
		element: I_Element,
		location: I_Vector,
		size: Size
	) {
		this.element = element
		this.location = location
		this.size = size
	}

	toJSON() {
		return {
			__type: "Draggable",
			...this
		}
	}
}
