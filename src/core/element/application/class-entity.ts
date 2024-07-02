import { ElementType, I_Serializable } from "../../general/domain"
import { I_RelationshipsStore } from "../../relationships/domain"
import { Element } from "../domain"

export class ClassEntity extends Element implements I_Serializable {

	constructor(relationshipStore: I_RelationshipsStore, key?: string) {
		super(ElementType.Class, relationshipStore, key)
	}

	toJSON(): any {
		return {
			__type: "ClassEntity",
			...this
		}
	}
}
