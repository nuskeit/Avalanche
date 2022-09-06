import * as g from "../../../../../general"
import { I_Serializable } from "../../../../../general/domain"
import * as elementNS from "../../element"

export class EnumEntity extends elementNS.domain.Element implements I_Serializable {

	constructor(key: string = "") {
		super(g.domain.ElementType.Enum, key)
	}

	toJSON(): any {
		return {
			__type: "EnumEntity",
			...this
		}
	}
}
