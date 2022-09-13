import { FieldType } from "../../../../../../general/domain"
import { Field } from "../domain"
import { I_TypeDef } from "../type-def/domain"

export class PropertyField extends Field {

	constructor(name: string, dataTypeDef: I_TypeDef, key?: string) {
		super(name, FieldType.Property, dataTypeDef, key)
	}

	toJSON() {
		return {
			__type: "PropertyField",
			...super.toJSON()
		}
	}
}

