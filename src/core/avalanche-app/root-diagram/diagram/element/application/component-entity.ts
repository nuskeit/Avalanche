import * as g from "../../../../../general"
import { I_Serializable } from "../../../../../general/domain"
import * as elementDomainNS from "../../element/domain"
import * as fieldAppNS from "../field/application"

export class ComponentEntity extends elementDomainNS.Element implements I_Serializable {

	constructor(key: string = "") {
		super(g.domain.ElementType.Class, key)
		this.props = []
		this.events = []
	}

	props: string[]
	events: fieldAppNS.EventField[]

	toJSON(): any {
		return {
			__type: "ComponentEntity",
			...this
		}
	}
}
