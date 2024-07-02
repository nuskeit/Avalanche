import { I_DraggableElement } from "../../drag/domain/draggable-element"
import { AppFactory } from "../../factories/app-factory/application"
import { DiagramType, getRandomPosition, GlobalKey, HashTable, I_ViewBox, I_ViewPort, undefOrNullDefault, NumericRange, RelationshipType, Size, Vector, defaultValue, I_Zoom } from "../../general/domain"
import { Zoom } from "../../general/presenter"
import { I_ElementsRelationship } from "../../relationships/domain"
import { I_Diagram } from "../domain"
import { I_Element } from "../../element/domain"

export class Diagram implements I_Diagram {
	constructor(name: string, diagramType: DiagramType,
		viewBox: I_ViewBox, viewPort: I_ViewPort, zoom: I_Zoom = new Zoom(1, .1, 2), key?: string) {
		this._key = key ? key : GlobalKey.getNewGlobalKey()
		this.name = name
		this._diagramType = diagramType
		this._elements = {}
		this.visible = true
		this.viewBox = viewBox
		this.viewPort = viewPort
		this.zoom = zoom
	}
	viewBox: I_ViewBox
	viewPort: I_ViewPort

	_key: string
	get key(): string { return this._key }
	name: string

	_diagramType: DiagramType
	get diagramType(): DiagramType { return this._diagramType }
	visible: boolean

	_elements: HashTable<I_DraggableElement>
	get elements(): HashTable<I_DraggableElement> { return this._elements }

	addElement(element: I_Element, x?: number, y?: number, size?: Size): void {
		if (this.elements[element.key] != undefined) return
		const _x = defaultValue<number>(x, [null, undefined], getRandomPosition(300, 50))
		const _y = undefOrNullDefault<number>(y, getRandomPosition(200, 50))
		const _size: Size = undefOrNullDefault<Size>(size, new Size(180, 30))
		this.elements[element.key] = AppFactory.getSingleton().createDraggableElement(element, new Vector(_x, _y), _size)
	}

	zoom: I_Zoom


	removeElement(key: string): void {
		this.removeRelationshipsByElement(key)
		delete this.elements[key]

	}

	removeRelationshipsByElement(key: string): void {
		AppFactory.getSingleton().createRelationshipsStore().removeRelationshipsByElement(key)
	}

	removeRelationshipsBySource(key: string): void {
		AppFactory.getSingleton().createRelationshipsStore().removeRelationshipsBySource(key)
	}

	removeRelationshipsByTarget(key: string): void {
		AppFactory.getSingleton().createRelationshipsStore().removeRelationshipsByTarget(key)
	}

	addRelationship(rel: I_ElementsRelationship): void {
		AppFactory.getSingleton().createRelationshipsStore().addRelationship(rel)
	}

	// relationships: I_ElementsRelationship[] = []

	// detectRelationshipsChanges(): void {
	// 	this.relationships.length = 0
	// 	for (const elemenKey in this.elements) {
	// 		this.elements[elemenKey].element.fields.forEach(field => {
	// 			if (field.dataTypeDef?.refElement != null)
	// 				this.relationships.push(AppFactory.getSingleton().createElementsRelationship(
	// 					field.key, field.dataTypeDef?.refElement?.key, elemenKey, field.dataTypeDef?.refElement?.key,
	// 					field.name + " --> " + this.elements[field.dataTypeDef?.refElement?.key].element.name,
	// 					RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))

	// 			field.parameters?.forEach(p => {
	// 				if (p.dataTypeDef.refElement != null)
	// 					this.relationships.push(AppFactory.getSingleton().createElementsRelationship(
	// 						field.key, p.dataTypeDef?.refElement?.key, elemenKey, p.dataTypeDef?.refElement?.key,
	// 						field.name + " --> " + relationshipTagNameComposer(this.elements, p.dataTypeDef?.refElement?.key),
	// 						RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))
	// 			})
	// 		})
	// 	}
	// }

	// detectRelationshipsChanges(): void {
	// 	this.relationships.length = 0
	// 	this.relationships = AppFactory.getSingleton().createRelationshipsStore().relationships.filter(
	// 		rel => rel.sourceElementKey in this.elements && rel.targetElementKey in this.elements)
	// }



	detectRelationshipsChanges(): void {
		// const relationships = [...this.getRelationships().filter(r => )]

		// for (const elemenKey in this.elements) {
		// 	this.elements[elemenKey].element.fields.forEach(field => {
		// 		if (field.dataTypeDef?.refElement != null)
		// 			this.removeRelationshipsByTarget(field.dataTypeDef.key)
		// 		this.removeRelationshipsBySource(field.dataTypeDef.key)

		// 		field.parameters?.forEach(p => {
		// 			if (p.dataTypeDef.refElement != null)
		// 				this.removeRelationshipsByTarget(field.dataTypeDef.key)
		// 			this.removeRelationshipsBySource(field.dataTypeDef.key)
		// 		})
		// 	})
		// }
	}

	getRelationships(): I_ElementsRelationship[] {
		return AppFactory.getSingleton().createRelationshipsStore().relationships.filter(
			rel => rel.sourceElementKey in this.elements && rel.targetElementKey in this.elements)
	}

	// "this.elements[p.dataTypeDef?.refElement?.key].element.name"

	toJSON() {
		return {
			__type: "Diagram",
			...this
		}
	}

}


function relationshipTagNameComposer(elements: HashTable<I_DraggableElement>, key: string) {
	if (key in elements)
		return elements[key].element.name
	return ""
}