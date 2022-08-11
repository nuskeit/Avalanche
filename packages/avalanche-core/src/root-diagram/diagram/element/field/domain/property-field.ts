import { Field, I_TypeDef } from "..";
import { FieldType, Nullable } from "../../../../..";

export class PropertyField extends Field {

    constructor(name: string, dataTypeDef: Nullable<I_TypeDef>, key: string = "") {
        super(name, FieldType.Property, dataTypeDef, key)
    }

    toJSON() {
        return {
            __type: "PropertyField",
            ...super.toJSON()
        }
    }
}

