import { ElementType, I_Serializable } from "../../general/domain"
import { I_RelationshipsStore } from "../../relationships/domain"
import { Element } from "../domain"

export class InterfaceEntity extends Element implements I_Serializable {

	constructor(relationshipStore: I_RelationshipsStore, key?: string) {
		super(ElementType.Interface, relationshipStore, key)
	}

	toJSON(): any {
		return {
			__type: "InterfaceEntity",
			...this
		}
	}
}
