import { Draggable } from "../../../../drag/application"
import { I_Draggable } from "../../../../drag/domain"
import { I_DraggableElement } from "../../../../drag/domain/draggable-element"
import { AppFactory } from "../../../../factories/app-factory/application"
import { DiagramType, getRandomPosition, GlobalKey, HashTable, I_ViewBox, I_ViewPort, Nullable, NumericRange, RelationshipType, Size, Vector } from "../../../../general/domain"
import { I_ElementsRelationship } from "../../../../relationships/domain"
import { I_Diagram } from "../domain"
import { I_Element } from "../element/domain"

export class Diagram implements I_Diagram {
	constructor(name: string, diagramType: DiagramType,
		viewBox: I_ViewBox, viewPort: I_ViewPort, key?: string) {
		this._key = key ? key : GlobalKey.getNewGlobalKey()
		this.name = name
		this._diagramType = diagramType
		this._elements = {}
		this.visible = true
		this.viewBox = viewBox
		this.viewPort = viewPort
	}
	viewBox: I_ViewBox
	viewPort: I_ViewPort

	private _key: string
	public get key(): string { return this._key }
	public name: string

	private _diagramType: DiagramType
	public get diagramType(): DiagramType { return this._diagramType }
	public visible: boolean

	private _elements: HashTable<I_DraggableElement>
	public get elements(): HashTable<I_DraggableElement> { return this._elements }

	addElement(element: I_Element, x: Nullable<number> = null,
		y: Nullable<number> = null, size: Size = { width: 180, height: "auto" }): void {
		let _x: number, _y: number
		if (x == null) _x = getRandomPosition(300, 50); else _x = x
		if (y == null) _y = getRandomPosition(200, 50); else _y = y
		this.elements[element.key] = AppFactory.getSingleton().createDraggableElement(element, new Vector(_x, _y), size)
	}

	removeElement(key: string): void {
		this.removeRelationshipsByElement(key)
		delete this.elements[key]

	}

	removeRelationshipsByElement(key: string): void {
		this.relationships = this.relationships.filter(r => r.sourceElementKey != key && r.targetElementKey != key)
		AppFactory.getSingleton().createRelationshipsStore().removeRelationshipsByElement(key)
	}

	relationships: I_ElementsRelationship[] = []

	detectRelationshipsChanges(): void {
		this.relationships.length = 0
		for (const elemenKey in this.elements) {
			this.elements[elemenKey].element.fields.forEach(e => {
				if (e.dataTypeDef?.refElement != null)
					this.relationships.push(AppFactory.getSingleton().createElementsRelationship(
						e.key, e.dataTypeDef?.refElement?.key, elemenKey, e.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))

				e.parameters?.forEach(p => {
					if (p.dataTypeDef.refElement != null)
						this.relationships.push(AppFactory.getSingleton().createElementsRelationship(
							e.key, p.dataTypeDef?.refElement?.key, elemenKey, p.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))
				})
			})
		}
	}



	toJSON() {
		return {
			__type: "Diagram",
			...this
		}
	}

}
