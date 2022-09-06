import { I_NumericRange, RelationshipType } from "../../general/domain"

export interface I_ElementsRelationship {
	readonly key: string
	readonly sourceKey: string
	readonly targetKey: string
	sourceMultiplicity: I_NumericRange
	targetMultiplicity: I_NumericRange
	tag: string
	relationshipType: RelationshipType
}
