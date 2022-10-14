import { I_Vector } from "../../general/domain"

export interface I_Draggable<T> {
	element: T
	location: I_Vector
}
