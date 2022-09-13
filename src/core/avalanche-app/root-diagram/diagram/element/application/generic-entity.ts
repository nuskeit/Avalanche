import { ElementType, I_Serializable } from "../../../../../general/domain"
import { I_RelationshipsStore } from "../../../../../relationships/domain"
import { Element } from "../domain"

export class GenericEntity extends Element implements I_Serializable {

	constructor(relationshipStore: I_RelationshipsStore, key?: string) {
		super(ElementType.GenericEntity, relationshipStore, key)
	}

	toJSON(): any {
		return {
			__type: "GenericEntity",
			...this
		}
	}
}
