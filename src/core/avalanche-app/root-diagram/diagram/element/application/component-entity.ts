import { ElementType, I_Serializable } from "../../../../../general/domain"
import { I_RelationshipsStore } from "../../../../../relationships/domain"
import { Element } from "../domain"
import { EventField } from "../field/application"

export class ComponentEntity extends Element implements I_Serializable {

	constructor(relationshipStore: I_RelationshipsStore, key?: string) {
		super(ElementType.Class, relationshipStore, key)
		this.props = []
		this.events = []
	}

	props: string[]
	events: EventField[]

	toJSON(): any {
		return {
			__type: "ComponentEntity",
			...this
		}
	}
}
