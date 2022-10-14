import { I_Serializable } from "../../general/domain"
import { I_ElementsRelationship, I_RelationshipsStore } from "../domain"

export class RelationshipsStore implements I_RelationshipsStore, I_Serializable {
	relationships: I_ElementsRelationship[] = []

	addRelationship(rel: I_ElementsRelationship) {
		this.relationships.push(rel)
	}

	removeRelationshipsByElement(key: string): void {
		this.relationships = this.relationships.filter(r => r.sourceElementKey != key && r.targetElementKey != key)
	}


	toJSON(): any {
		return {
			__type: "RelationshipsStore",
			...this
		}
	}
}
