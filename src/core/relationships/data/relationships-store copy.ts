import { I_Serializable } from "../../general/domain"
import * as rela from "../../relationships"
import { I_RelationshipsStore } from "../domain"

export class RelationshipsStore implements I_RelationshipsStore, I_Serializable {
	relationships: rela.domain.I_ElementsRelationship[] = []

	addRelationship(rel: rela.domain.I_ElementsRelationship) {
		this.relationships.push(rel)
	}

	getAllRelations(elementKey: string): rela.domain.I_ElementsRelationship[] {
		return this.relationships.filter(e => e.sourceKey == elementKey || e.targetKey == elementKey)
	}
	// getInboundRelations(elementKey: string): rela.domain.I_ElementsRelationship[] {
	// 	return this.relationships.filter(e => e.targetKey == elementKey)
	// }
	// getOutboundRelations(elementKey: string): rela.domain.I_ElementsRelationship[] {
	// 	return this.relationships.filter(e => e.sourceKey == elementKey)
	// }

	toJSON(): any {
		return {
			__type: "RelationshipsStore",
			...this
		}
	}
}
