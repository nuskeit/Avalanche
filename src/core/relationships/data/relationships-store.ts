import { I_Serializable } from "../../general/domain"
import * as rela from "../../relationships"

export class RelationsStore implements I_Serializable {
	relationships: rela.domain.I_ElementsRelationship[] = []

	addRelation(rel: rela.domain.I_ElementsRelationship) {
		this.relationships.push(rel)
	}

	getAllRelations(elementKey: string): rela.domain.I_ElementsRelationship[] {
		return this.relationships.filter(e => e.sourceKey == elementKey || e.targetKey == elementKey)
	}
	getInboundRelations(elementKey: string): rela.domain.I_ElementsRelationship[] {
		return this.relationships.filter(e => e.targetKey == elementKey)
	}
	getOutboundRelations(elementKey: string): rela.domain.I_ElementsRelationship[] {
		return this.relationships.filter(e => e.sourceKey == elementKey)
	}

	toJSON(): any {
		return {
			__type: "RelationsStore",
			...this
		}
	}
}
