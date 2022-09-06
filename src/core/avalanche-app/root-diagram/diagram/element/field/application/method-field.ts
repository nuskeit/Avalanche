import * as g from "../../../../../../general"
import * as fieldDomainNS from "../../Field/domain"
import * as typeDef from "../type-def"

export class MethodField extends fieldDomainNS.Field {

	readonly parameters: fieldDomainNS.I_Parameter[]

	constructor(name: string, dataTypeDef: g.domain.Nullable<typeDef.domain.I_TypeDef>,
		parameters: g.domain.Nullable<fieldDomainNS.I_Parameter[]>, key: string = "") {
		super(name, g.domain.FieldType.Method, dataTypeDef, key)
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

