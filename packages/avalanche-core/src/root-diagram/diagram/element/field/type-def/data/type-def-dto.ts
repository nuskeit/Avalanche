import { DataType, Nullable } from "../../../../../.."

export class TypeDef_DTO {
    name: string
    fallbackDataType: DataType
    refElementKey: Nullable<string>

    constructor(name: string, fallbackDataType: DataType, refElementKey: Nullable<string>) {
        this.name = name
        this.refElementKey = refElementKey
        this.fallbackDataType = fallbackDataType
    }

}