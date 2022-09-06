import * as g from "../../../../../general"
import { I_Serializable } from "../../../../../general/domain"
// import * as elementNS from "../../element"
// export class ClassEntity extends elementNS.domain.Element {
import * as elementDomainNS from "../../element/domain"

export class ClassEntity extends elementDomainNS.Element implements I_Serializable {

	constructor(key: string = "") {
		super(g.domain.ElementType.Class, key)
	}

	toJSON(): any {
		return {
			__type: "ClassEntity",
			...this
		}
	}
}
