import { Draggable, Dragger } from "../../../../drag/application"
import { I_Draggable } from "../../../../drag/domain"
import { DiagramType, getRandomPosition, GlobalKey, HashTable, I_ViewBox, I_ViewPort, Nullable, NumericRange, RelationshipType, Vector } from "../../../../general/domain"
import { ElementsRelationship } from "../../../../relationships/application"
import { I_ElementsRelationship, I_RelationshipsStore } from "../../../../relationships/domain"
import { I_Diagram } from "../domain"
import { I_Element, I_ElementsStore } from "../element/domain"

export class Diagram implements I_Diagram {
	constructor(name: string, diagramType: DiagramType,
		viewBox: I_ViewBox, viewPort: I_ViewPort) {
		this._key = GlobalKey.getNewGlobalKey()
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

	private _elements: HashTable<I_Draggable<I_Element>>
	public get elements(): HashTable<I_Draggable<I_Element>> { return this._elements }

	addElement(element: I_Element, x: Nullable<number> = null,
		y: Nullable<number> = null, width: number = 180): void {
		let _x: number, _y: number
		if (x == null) _x = getRandomPosition(300, 50); else _x = x
		if (y == null) _y = getRandomPosition(200, 50); else _y = y
		this.elements[element.key] = new Draggable<I_Element>(element,
			new Dragger(element.key,
				new Vector(_x, _y),
				new Vector(_x, _y))
		)
	}


	relationships: I_ElementsRelationship[] = []

	detectRelationshipsChanges(): void {
		this.relationships.length = 0
		for (const elemenKey in this.elements) {
			this.elements[elemenKey].element.fields.forEach(e => {
				if (e.dataTypeDef?.refElement != null)
					this.relationships.push(new ElementsRelationship(elemenKey, e.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))

				e.parameters?.forEach(p => {
					if (p.dataTypeDef.refElement != null)
						this.relationships.push(new ElementsRelationship(elemenKey, p.dataTypeDef?.refElement?.key, "TAG", RelationshipType.DirectedAssociation, new NumericRange(1, 1), new NumericRange()))
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
