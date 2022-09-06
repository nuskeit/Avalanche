import * as g from "../../general"

export interface I_Dragger {
    get key(): string
    location: g.domain.I_Vector
    mouseLocation: g.domain.I_Vector
}
