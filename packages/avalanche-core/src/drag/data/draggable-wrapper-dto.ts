import { I_Vector } from "../.."

export class DraggableWrapper_DTO<T> {
    element: T
    location: I_Vector

    constructor(
        element: T,
        location: I_Vector
    ) {
        this.element = element
        this.location = location
    }
}
