import { I_Field } from "../../field/domain"
import { ElementType, GlobalKey } from "../../general/domain"
import { I_RelationshipsStore } from "../../relationships/domain"

export interface I_Element {
	readonly key: string
	name: string
	visible: boolean
	readonly elementType: ElementType
	fields: I_Field[]
	addField(f: I_Field): void
	removeField(f: I_Field): void
}

export class Element implements I_Element {
	readonly key: string
	name: string = ''
	visible: boolean = true
	readonly elementType: ElementType
	// relationshipsStore: I_RelationshipsStore
	fields: I_Field[]


	constructor(elementType: ElementType, relationshipStore: I_RelationshipsStore, key?: string) {
		this.key = key == undefined ? GlobalKey.getNewGlobalKey() : key
		// this.relationshipsStore = relationshipStore
		this.elementType = elementType
		this.fields = []
	}

	addField(f: I_Field): void {
		this.fields.push(f)
	}

	removeField(f: I_Field): void {
		this.fields = this.fields.filter(x => x.key != f.key)
	}

}

