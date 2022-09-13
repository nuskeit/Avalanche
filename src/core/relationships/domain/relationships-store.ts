import { I_ElementsRelationship } from "./elements-relationship"

export interface I_RelationshipsStore {
	relationships: I_ElementsRelationship[]

	addRelationship(rel: I_ElementsRelationship): void
	getAllRelations(elementKey: string): I_ElementsRelationship[]
}
