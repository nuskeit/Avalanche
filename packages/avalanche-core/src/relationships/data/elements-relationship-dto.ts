import { I_NumericRange_DTO, RelationshipType } from "../.."

export class ElementsRelationship_DTO {
    key: string
    sourceKey: string
    targetKey: string
    tag: string
    relationshipType: RelationshipType
    sourceMultiplicity: I_NumericRange_DTO
    targetMultiplicity: I_NumericRange_DTO

    constructor(
        sourceKey: string,
        targetKey: string,
        tag: string,
        relationshipType: RelationshipType,
        sourceMultiplicity: I_NumericRange_DTO,
        targetMultiplicity: I_NumericRange_DTO,
        key: string
    ) {
        this.sourceKey = sourceKey
        this.targetKey = targetKey
        this.tag = tag
        this.relationshipType = relationshipType
        this.sourceMultiplicity = sourceMultiplicity
        this.targetMultiplicity = targetMultiplicity
        this.key = key
    }
}
