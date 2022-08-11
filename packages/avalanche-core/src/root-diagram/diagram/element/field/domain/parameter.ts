import { I_TypeDef } from "..";
import { Nullable, ParamDirection, ParamValRef } from "../../../../..";

export interface I_Parameter {
    name: string
    direction: ParamDirection
    category: ParamValRef
    dataType: Nullable<I_TypeDef>
}

export class Parameter implements I_Parameter {
    name: string
    direction: ParamDirection
    category: ParamValRef
    dataType: Nullable<I_TypeDef>

    constructor(
        name: string,
        direction: ParamDirection,
        category: ParamValRef,
        dataType: Nullable<I_TypeDef>

    ) {
        this.name = name
        this.direction = direction
        this.category = category
        this.dataType = dataType
    }
}
