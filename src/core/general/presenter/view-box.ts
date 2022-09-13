import { I_Vector, I_ViewBox } from "../domain"

export class ViewBox implements I_ViewBox, I_Vector {
    x: number
    y: number
    width: number
    height: number

    constructor(
        x: number,
        y: number,
        width: number,
        height: number
    ) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }

    toJSON() {
        return {
            __type: "ViewBox",
            ...this
        }
    }
}