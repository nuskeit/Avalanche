import { I_Element } from "../../avalanche-app/root-diagram/diagram/element/domain"
import { I_Draggable } from "../../drag/domain"
import { I_Vector, Nullable, Vector } from "../domain"

export class DraggableHelper {

	constructor(toLocalVector: Function) {
		this.toLocalVector = toLocalVector
		this.mouseLocation = new Vector(0, 0)
	}

	toLocalVector: Function

	mouseLocation: I_Vector

	targetDraggable: Nullable<I_Draggable<any>> = null

	pickUpOffset: I_Vector = { x: 0, y: 0 }
	
	SetOffset(x: number, y: number) {
		this.pickUpOffset.x = x
		this.pickUpOffset.y = y
	}

	StartDrag(se: I_Draggable<any>, mouseLocation: I_Vector) {
		this.SetTargetDraggable(se)
		let loc = this.toLocalVector(mouseLocation.x, mouseLocation.y);
		this.SetOffset(se.location.x - loc.x, se.location.y - loc.y)
	}

	EndDrag() {
		this.SetTargetDraggable(null)
	}

	SetTargetDraggable(el: Nullable<I_Draggable<any>>) {
		this.targetDraggable = el
	}

	UpdateDrag(se: I_Draggable<I_Element>, clientX: number, clientY: number) {
		if (se != null) {
			let loc = this.toLocalVector(clientX, clientY);
			let x = loc.x + this.pickUpOffset.x
			let y = loc.y + this.pickUpOffset.y
			if (this.targetDraggable != null) {
				this.targetDraggable.location.x = x
				this.targetDraggable.location.y = y
				this.mouseLocation.x = x
				this.mouseLocation.y = y
			}
		}
	}
}


