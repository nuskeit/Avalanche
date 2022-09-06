import * as g from "../../../../../general"
import { RelationshipType } from "../../../../../general/domain"
import * as relationship from "../../../../../relationships"
import { ElementsRelationship } from "../../../../../relationships/application"
import * as fieldNS from "../field"

export interface I_Element {
	readonly key: string
	name: string
	visible: boolean
	readonly elementType: g.domain.ElementType
	fields: fieldNS.domain.I_Field[]
	getInboundRelations(store: relationship.domain.I_RelationsStore): relationship.domain.I_ElementsRelationship[]
	getOutboundRelations(store: relationship.domain.I_RelationsStore): relationship.domain.I_ElementsRelationship[]
}

export  class Element implements I_Element {
	readonly key: string
	name: string = ''
	visible: boolean = true
	readonly elementType: g.domain.ElementType
	fields: fieldNS.domain.I_Field[]

	constructor(elementType: g.domain.ElementType, key: string = "") {
		this.key = key === "" ? g.domain.GlobalKey.getNewGlobalKey() : key
		this.elementType = elementType
		this.fields = []
	}

	getInboundRelations(store: relationship.domain.I_RelationsStore): relationship.domain.I_ElementsRelationship[] {
		return store.getInboundRelations(this.key)
	}

	getOutboundRelations(store: relationship.domain.I_RelationsStore): relationship.domain.I_ElementsRelationship[] {
		return [...store.getOutboundRelations(this.key),
		...this.fields.filter(e => e.dataTypeDef?.refElement != null).map(e => {
			// @ts-ignore ts2345 refElement null check already done in filter
			return new ElementsRelationship(this.key, e.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, 1, 1)
		})
		]
	}

}

