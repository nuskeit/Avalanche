import { I_ElementsRelationship } from "../.."

export class RelationsStore {
    relationships: I_ElementsRelationship[] = []

    addRelation(rel: I_ElementsRelationship) {
        this.relationships.push(rel)
    }

    getAllRelations(elementKey: string): I_ElementsRelationship[] {
        return this.relationships.filter(e => e.sourceKey == elementKey || e.targetKey == elementKey)
    }
    getInboundRelations(elementKey: string): I_ElementsRelationship[] {
        return this.relationships.filter(e => e.targetKey == elementKey)
    }
    getOutboundRelations(elementKey: string): I_ElementsRelationship[] {
        return this.relationships.filter(e => e.sourceKey == elementKey)
    }

    toJSON() {
        return {
            __type: "RelationsStore",
            ...this
        }
    }
}
