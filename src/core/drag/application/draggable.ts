import * as drag from "../../drag"

export class Draggable<T> implements drag.domain.I_Draggable<T> {
	element: T
	dragger: drag.domain.I_Dragger

	constructor(
		element: T,
		dragger: drag.domain.I_Dragger
	) {
		this.element = element
		this.dragger = dragger
	}

	toJSON() {
		return {
			__type: "Draggable",
			...this
		}
	}
}
