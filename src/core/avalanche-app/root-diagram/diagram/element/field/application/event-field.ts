import * as g from "../../../../../../general"
import * as fieldDomainNS from "../../Field/domain"
import * as typeDef from "../type-def"

export class EventField extends fieldDomainNS.Field {
	constructor(name: string, dataTypeDef: g.domain.Nullable<typeDef.domain.I_TypeDef>, key: string = "") {
		super(name, g.domain.FieldType.Event, dataTypeDef, key)
	}

	toJSON() {
		return {
			__type: "EventField",
			...this
		}
	}

	
}