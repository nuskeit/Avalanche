import { Field, I_Parameter, I_TypeDef } from "..";
import { FieldType, Nullable } from "../../../../..";

export class MethodField extends Field {

    readonly parameters: I_Parameter[]

    constructor(name: string, dataTypeDef: Nullable<I_TypeDef>, parameters: Nullable<I_Parameter[]>, key: string = "") {
        super(name, FieldType.Method, dataTypeDef, key)
        if (parameters == null)
            this.parameters = []
        else
            this.parameters = parameters
    }

    toJSON() {
        return {
            __type: "PropertyField",
            ...super.toJSON()
        }
    }
}

