import { FieldType, Scope } from "../../../../../../general/domain"
import { Field } from "../domain"
import { I_TypeDef } from "../type-def/domain"

export class PropertyField extends Field {

	constructor(name: string, description: string, scope: Scope, dataTypeDef: I_TypeDef, key: string = "") {
		super(name, description, scope, FieldType.Property, dataTypeDef, key)
	}

	toJSON() {
		return {
			__type: "PropertyField",
			...this
		}
	}
}

