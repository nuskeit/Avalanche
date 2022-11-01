import { I_Element } from "../../avalanche-app/root-diagram/diagram/element/domain"
import { I_Vector, Size } from "../../general/domain"
import { I_DraggableElement } from "../domain/draggable-element"
import * as constantsNS from '../../../core/general/domain/constants';

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


	getHeightAuto(): number {
		return constantsNS.rowHeight + 2 + constantsNS.rowHeight * this.element.fields.length
	}

	get heightAuto(): number {
		return constantsNS.rowHeight + 2 + constantsNS.rowHeight * this.element.fields.length
	}

	toJSON() {
		return {
			__type: "Draggable",
			...this
		}
	}
}
