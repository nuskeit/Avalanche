import * as g from "../../../../../general"
import { I_Serializable } from "../../../../../general/domain"
import * as elementDomainNS from "../domain"

export class GenericEntity extends elementDomainNS.Element implements I_Serializable {

	constructor(key: string = "") {
		super(g.domain.ElementType.Entity, key)
	}

	toJSON(): any {
		return {
			__type: "GenericEntity",
			...this
		}
	}
}
