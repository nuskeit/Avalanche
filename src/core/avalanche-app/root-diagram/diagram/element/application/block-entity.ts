import * as g from "../../../../../general"
import { I_Serializable } from "../../../../../general/domain"
import * as elementDomainNS from "../../element/domain"

export class BlockEntity extends elementDomainNS.Element implements I_Serializable {

	constructor(key: string = "") {
		super(g.domain.ElementType.Block, key)
	}

	toJSON(): any {
		return {
			__type: "BlockEntity",
			...this
		}
	}
}
