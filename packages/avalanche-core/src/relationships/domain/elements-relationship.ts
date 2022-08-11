import { GlobalKey, I_NumericRange, Nullable, NumericRange, RelationshipType } from "../.."

export interface I_ElementsRelationship {
	readonly key: string
	readonly sourceKey: string
	readonly targetKey: string
	sourceMultiplicity: I_NumericRange
	targetMultiplicity: I_NumericRange
	tag: string
	relationshipType: RelationshipType
}

export class ElementsRelationship implements I_ElementsRelationship {
	readonly key: string
	readonly sourceKey: string
	readonly targetKey: string
	sourceMultiplicity: I_NumericRange
	targetMultiplicity: I_NumericRange
	tag: string
	relationshipType: RelationshipType

	constructor(
		sourceKey: string,
		targetKey: string,
		tag: string,
		relationshipType: RelationshipType,
		sourceMultiplicity: I_NumericRange = new NumericRange(),
		targetMultiplicity: I_NumericRange = new NumericRange(),
		key: Nullable<string> = null
	) {
		if (key != null || key != undefined)
			this.key = key
		else
			this.key = `rel${GlobalKey.getNewGlobalKey()}`
		this.sourceKey = sourceKey
		this.targetKey = targetKey
		this.tag = tag
		this.relationshipType = relationshipType
		this.sourceMultiplicity = sourceMultiplicity
		this.targetMultiplicity = targetMultiplicity
	}

	toJSON() {
		return {
			__type: "ElementsRelationship",
			...this
		}
	}
}
