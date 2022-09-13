import { FieldType, Nullable } from "../../../../../../general/domain"
import { Field, I_Parameter } from "../domain"
import { I_TypeDef } from "../type-def/domain"

export class MethodField extends Field {

	readonly parameters: I_Parameter[]

	constructor(name: string, dataTypeDef: I_TypeDef,
		parameters: Nullable<I_Parameter[]>, key?: string) {
		super(name, FieldType.Method, dataTypeDef, key)
		if (parameters == null)
			this.parameters = []
		else
			this.parameters = parameters
	}

	toJSON() {
		return {
			__type: "MethodField",
			...super.toJSON()
		}
	}
}

