import * as g from "../../../../../../general"
import * as typeDef from "../type-def"
import * as field from "../../field"
import { Parameter_DTO } from "./parameter-dto"

export class MethodField_DTO extends field.data.Field_DTO {

    parameters: Parameter_DTO[]

    constructor(key: string,
        name: string,
        text: string,
        fieldType: g.domain.FieldType,
        dataTypeDef: g.domain.Nullable<typeDef.data.TypeDef_DTO>,
        parameters: g.domain.Nullable<Parameter_DTO[]>
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
