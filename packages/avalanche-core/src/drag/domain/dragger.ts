import { I_Vector } from ".";

export interface I_Dragger {
    get key(): string
    location: I_Vector
    mouseLocation: I_Vector
}

export class Dragger implements I_Dragger {
    private _key: string
    location: I_Vector
    mouseLocation: I_Vector

    constructor(
        key: string,
        location: I_Vector,
        mouseLocation: I_Vector
    ) {
        this._key = key
        this.location = location
        this.mouseLocation = mouseLocation
    }

    public get key(): string { return this._key }

    toJSON() {
        return {
            __type: "Dragger",
            ...this
        }
    }
}
