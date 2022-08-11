import { I_Field } from ".."
import {
    ElementsRelationship, ElementType, GlobalKey, I_ElementsRelationship,
    RelationshipType, RelationsStore
} from "../../../.."

export interface I_Element {
    readonly key: string
    name: string
    visible: boolean
    readonly elementType: ElementType
    fields: I_Field[]
    getInboundRelations(store: RelationsStore): I_ElementsRelationship[]
    getOutboundRelations(store: RelationsStore): I_ElementsRelationship[]
}

export abstract class Element implements I_Element {
    readonly key: string
    name: string = ''
    visible: boolean = true
    readonly elementType: ElementType
    fields: I_Field[]

    constructor(elementType: ElementType, key: string = "") {
        this.key = key === "" ? GlobalKey.getNewGlobalKey() : key
        this.elementType = elementType
        this.fields = []
    }

    getInboundRelations(store: RelationsStore): I_ElementsRelationship[] {
        return store.getInboundRelations(this.key)
    }

    getOutboundRelations(store: RelationsStore): I_ElementsRelationship[] {
        return [...store.getOutboundRelations(this.key),
        ...this.fields.filter(e => e.dataTypeDef?.refElement != null).map(e => {
            // @ts-ignore ts2345 refElement null check already done in filter
            return new ElementsRelationship(this.key, e.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, 1, 1)
        })
        ]
    }

    setState(state: Element) {
        this.name = state['name']
        this.visible = state['visible']
        this.fields = state['fields']
    }

    toJSON() {
        return {
            key: this.key,
            name: this.name,
            visible: this.visible,
            elementType: this.elementType,
            fields: this.fields,
        }
    }
}
