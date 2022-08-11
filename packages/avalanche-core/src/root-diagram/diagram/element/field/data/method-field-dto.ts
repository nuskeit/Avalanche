import { TypeDef_DTO } from ".."
import { FieldType, Nullable } from "../../../../.."
import { Field_DTO, Parameter_DTO } from "."

export class MethodField_DTO extends Field_DTO {

    parameters: Parameter_DTO[]

    constructor(key: string,
        name: string,
        text: string,
        fieldType: FieldType,
        dataTypeDef: Nullable<TypeDef_DTO>,
        parameters: Nullable<Parameter_DTO[]>
    ) {
        super(key
            , name
            , text
            , fieldType
            , dataTypeDef)
        if (parameters == null)
            this.parameters = []
        else
            this.parameters = parameters
    }

}
