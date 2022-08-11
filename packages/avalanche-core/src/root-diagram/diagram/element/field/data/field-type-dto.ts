import { DataType, FieldType, Nullable } from "../../../../.."

export interface I_TypeDef_DTO {
    name: string
    fallbackDataType: DataType
    refElementKey: Nullable<string>
}

/*

REVIEW THIS!!!!!!!
REVIEW THIS!!!!!!!
REVIEW THIS!!!!!!!
REVIEW THIS!!!!!!!
REVIEW THIS!!!!!!!

*/
export class FieldTypeDTO {
    key: string
    value: FieldType


    constructor(code: string, value: FieldType) {
        this.key = code
        this.value = value
    }

}