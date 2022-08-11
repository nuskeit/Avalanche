import { TypeDef_DTO } from ".."
import { FieldType, Nullable } from "../../../../.."
import { I_Parameter_DTO, I_TypeDef_DTO, Parameter_DTO } from "."

export interface I_Field_DTO {
    key: string
    name: string
    text: string
    fieldType: FieldType
    dataTypeDef: Nullable<I_TypeDef_DTO>
    parameters?: Nullable<I_Parameter_DTO[]>
}

export abstract class Field_DTO {
    key: string
    name: string
    text: string
    fieldType: FieldType
    dataTypeDef: Nullable<TypeDef_DTO>
    parameters?: Nullable<Parameter_DTO[]>

    constructor(key: string,
        name: string,
        text: string,
        fieldType: FieldType,
        dataTypeDef: Nullable<TypeDef_DTO>,
        parameters?: Nullable<Parameter_DTO[]>
    ) {
        this.key = key
        this.name = name
        this.text = text
        this.fieldType = fieldType
        this.dataTypeDef = dataTypeDef
        this.parameters = parameters
    }

}
