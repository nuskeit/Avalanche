import { I_ElementsRelationship } from "./elements-relationship"

export interface I_RelationshipsStore {
	relationships: I_ElementsRelationship[]

	addRelationship(rel: I_ElementsRelationship): void

	removeRelationshipsByElement(key: string): void

	removeRelationshipsByElement(key: string): void


}
