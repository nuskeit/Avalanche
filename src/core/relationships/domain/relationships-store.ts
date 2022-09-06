import * as relationshipNS from "../../relationships"

export interface I_RelationsStore {
	relationships: relationshipNS.domain.I_ElementsRelationship[]

	addRelation(rel: relationshipNS.domain.I_ElementsRelationship): void
	getAllRelations(elementKey: string): relationshipNS.domain.I_ElementsRelationship[]
	getInboundRelations(elementKey: string): relationshipNS.domain.I_ElementsRelationship[]
	getOutboundRelations(elementKey: string): relationshipNS.domain.I_ElementsRelationship[]
}
