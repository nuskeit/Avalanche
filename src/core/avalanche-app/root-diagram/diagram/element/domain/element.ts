import { ElementType, GlobalKey, NumericRange, RelationshipType } from "../../../../../general/domain"
import { ElementsRelationship } from "../../../../../relationships/application"
import { I_RelationshipsStore } from "../../../../../relationships/domain"
import { I_Field } from "../field/domain"

export interface I_Element {
	readonly key: string
	name: string
	visible: boolean
	readonly elementType: ElementType
	fields: I_Field[]
	addField(f: I_Field): void
	calculateOutboundRelations(): void
}

export class Element implements I_Element {
	readonly key: string
	name: string = ''
	visible: boolean = true
	readonly elementType: ElementType
	relationshipsStore: I_RelationshipsStore
	fields: I_Field[]


	constructor(elementType: ElementType, relationshipStore: I_RelationshipsStore, key?: string) {
		this.key = key == undefined ? GlobalKey.getNewGlobalKey() : key
		this.relationshipsStore = relationshipStore
		this.elementType = elementType
		this.fields = []
	}

	addField(f: I_Field): void {
		f.event_dataTypeDef_changed = (oldField: I_Field, newField: I_Field) => this.calculateOutboundRelations();
		this.fields.push(f)
		this.calculateSingleOutboundRelations(f)
	}

	calculateOutboundRelations(): void {
		this.fields.forEach(e => {

			if (e.dataTypeDef?.refElement != null)
				// @ts-ignore ts2345 refElement null check already done in filter
				this.relationshipsStore.addRelationship(new ElementsRelationship(this.key, e.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))

			e.parameters?.forEach(p => {
				if (p.dataTypeDef.refElement != null)
					this.relationshipsStore.addRelationship(new ElementsRelationship(this.key, p.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))
			})

		})
	}

	calculateSingleOutboundRelations(f: I_Field): void {
		if (f.dataTypeDef?.refElement != null)
			// @ts-ignore ts2345 refElement null check already done in filter
			this.relationshipsStore.addRelationship(new ElementsRelationship(this.key, f.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))

		f.parameters?.forEach(p => {
			if (p.dataTypeDef.refElement != null)
				this.relationshipsStore.addRelationship(new ElementsRelationship(this.key, p.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))
		})

	}

}

