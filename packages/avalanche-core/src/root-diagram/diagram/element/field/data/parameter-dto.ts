import { TypeDef_DTO } from ".."
import { Nullable, ParamDirection, ParamValRef } from "../../../../.."
import { I_TypeDef_DTO } from "."

export interface I_Parameter_DTO {
    name: string
    direction: ParamDirection
    category: ParamValRef
    dataType: Nullable<I_TypeDef_DTO>
}

export class Parameter_DTO {
    name: string
    direction: ParamDirection
    category: ParamValRef
    dataType: Nullable<TypeDef_DTO>

    constructor(
        name: string,
        direction: ParamDirection,
        category: ParamValRef,
        dataType: Nullable<TypeDef_DTO>
    ) {
        this.name = name
        this.direction = direction
        this.category = category
        this.dataType = dataType
    }
}