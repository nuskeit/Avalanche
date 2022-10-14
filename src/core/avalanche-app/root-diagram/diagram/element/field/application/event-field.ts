import { FieldType, Nullable, Scope } from "../../../../../../general/domain"
import { Field, I_Parameter } from "../domain"
import { I_TypeDef } from "../type-def/domain"

export class EventField extends Field {

	readonly parameters: I_Parameter[]

	constructor(name: string, description: string, scope: Scope, dataTypeDef: I_TypeDef,
		parameters: Nullable<I_Parameter[]>, key: string = "") {

		super(name, description, scope, FieldType.Event, dataTypeDef, key)

		if (parameters == null)
			this.parameters = []
		else
			this.parameters = parameters
	}

	toJSON() {
		return {
			__type: "EventField",
			...this
		}
	}


}