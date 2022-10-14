import { I_Element } from "../../avalanche-app/root-diagram/diagram/element/domain"
import { Size } from "../../general/domain"
import { I_Draggable } from "./draggable"

export interface I_DraggableElement extends I_Draggable<I_Element> {
	size: Size
}
