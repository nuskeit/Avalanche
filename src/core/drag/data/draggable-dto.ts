import * as g from "../../general"

export class Draggable_DTO<T> {
    element: T
    location: g.domain.I_Vector

    constructor(
        element: T,
        location: g.domain.I_Vector
    ) {
        this.element = element
        this.location = location
    }
}
