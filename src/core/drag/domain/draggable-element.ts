import { I_Element } from "../../element/domain"
import { Size } from "../../general/domain"
import { I_Draggable } from "./draggable"

export interface I_DraggableElement extends I_Draggable<I_Element> {
	size: Size
	get heightAuto(): number
}
