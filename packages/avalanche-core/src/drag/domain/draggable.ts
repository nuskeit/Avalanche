import { I_Dragger } from ".."

export interface I_DraggableWrapper<T> {
    element: T
    dragger: I_Dragger
}

export class DraggableWrapper<T> implements I_DraggableWrapper<T> {
    element: T
    dragger: I_Dragger

    constructor(
        element: T,
        dragger: I_Dragger
    ) {
        this.element = element
        this.dragger = dragger
    }

    toJSON() {
        return {
            __type: "DraggableWrapper",
            ...this
        }
    }
}
