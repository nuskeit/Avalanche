import { I_Vector } from "../../domain/generic-types"

export class ViewBox implements I_Vector {
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