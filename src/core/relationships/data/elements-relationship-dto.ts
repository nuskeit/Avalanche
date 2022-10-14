import * as g from "../../general"

export class ElementsRelationship_DTO {
    key: string
    sourceKey: string
    targetKey: string
    sourceElementKey: string
    targetElementKey: string
    tag: string
    relationshipType: g.domain.RelationshipType
    sourceMultiplicity: g.data.I_NumericRange_DTO
    targetMultiplicity: g.data.I_NumericRange_DTO

    constructor(
        sourceKey: string,
        targetKey: string,
        sourceElementKey: string,
        targetElementKey: string,
        tag: string,
        relationshipType: g.domain.RelationshipType,
        sourceMultiplicity: g.data.I_NumericRange_DTO,
        targetMultiplicity: g.data.I_NumericRange_DTO,
        key: string
    ) {
        this.sourceKey = sourceKey
        this.targetKey = targetKey
        this.sourceElementKey = sourceElementKey
        this.targetElementKey = targetElementKey
        this.tag = tag
        this.relationshipType = relationshipType
        this.sourceMultiplicity = sourceMultiplicity
        this.targetMultiplicity = targetMultiplicity
        this.key = key
    }
}
