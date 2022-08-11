import { TypeDef_DTO } from ".."
import { FieldType, Nullable } from "../../../../.."
import { Field_DTO } from "."

export class PropertyField_DTO extends Field_DTO {

    constructor(key: string,
        name: string,
        text: string,
        fieldType: FieldType,
        dataTypeDef: Nullable<TypeDef_DTO>
    ) {
        super(key
            , name
            , text
            , fieldType
            , dataTypeDef)
    }
}
