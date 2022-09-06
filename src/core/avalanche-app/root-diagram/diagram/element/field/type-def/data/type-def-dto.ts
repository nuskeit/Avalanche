import * as g from "../../../../../../../general"

export class TypeDef_DTO {
    key: string
    name: string
    fallbackDataType: g.domain.DataType
    refElementKey: g.domain.Nullable<string>

    constructor(key: string, name: string, fallbackDataType: g.domain.DataType, refElementKey: g.domain.Nullable<string>) {
        this.key = key
        this.name = name
        this.refElementKey = refElementKey
        this.fallbackDataType = fallbackDataType
    }

}