import * as g from "../../../../../general"
import { I_Serializable } from "../../../../../general/domain"
import * as elementNS from "../../element"

export class ExternalDependencyEntity extends elementNS.domain.Element implements I_Serializable {

	constructor(key: string = "") {
		super(g.domain.ElementType.ExternalDependency, key)
	}

	toJSON(): any {
		return {
			__type: "ExternalDependencyEntity",
			...this
		}
	}
}
