import * as dragNS from "../../drag"

export interface I_Draggable<T> {
	element: T
	dragger: dragNS.domain.I_Dragger
}
