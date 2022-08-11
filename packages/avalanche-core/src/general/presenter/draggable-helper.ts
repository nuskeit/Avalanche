import { I_DraggableWrapper, I_Element, I_Vector, Nullable } from '../..';

export class DraggableHelper {

    constructor(toLocalVector: Function) {
        this.toLocalVector = toLocalVector
    }

    toLocalVector: Function

    targetDraggable: Nullable<I_DraggableWrapper<any>> = null

    pickUpOffset: I_Vector = { x: 0, y: 0 }
    SetOffset(x: number, y: number) {
        this.pickUpOffset.x = x
        this.pickUpOffset.y = y
    }

    StartDrag(se: I_DraggableWrapper<any>) {
        this.SetTargetDraggable(se)
        let loc = this.toLocalVector(se.dragger.mouseLocation.x, se.dragger.mouseLocation.y);
        this.SetOffset(se.dragger.location.x - loc.x, se.dragger.location.y - loc.y)
    }

    EndDrag() {
        this.SetTargetDraggable(null)
    }

    SetTargetDraggable(el: Nullable<I_DraggableWrapper<any>>) {
        this.targetDraggable = el
    }

    UpdateDrag(se: I_DraggableWrapper<I_Element>, clientX: number, clientY: number) {
        if (se != null) {
            let loc = this.toLocalVector(clientX, clientY);
            let x = loc.x + this.pickUpOffset.x
            let y = loc.y + this.pickUpOffset.y
            if (this.targetDraggable != null) {
                this.targetDraggable.dragger.location.x = x
                this.targetDraggable.dragger.location.y = y
                this.targetDraggable.dragger.mouseLocation.x = x
                this.targetDraggable.dragger.mouseLocation.y = y
            }
        }
    }
}


