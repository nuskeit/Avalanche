import { I_Element } from "../../avalanche-app/root-diagram/diagram/element/domain"
import { I_Vector, Size } from "../../general/domain"

export class DraggableElement_DTO {
	element: string
	location: I_Vector
	size: Size

	constructor(
		element: string,
		location: I_Vector,
		size: Size
	) {
		this.element = element
		this.location = location
		this.size = size
	}
}
