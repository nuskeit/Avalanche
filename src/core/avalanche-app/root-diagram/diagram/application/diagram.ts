import { Draggable, Dragger } from "../../../../drag/application"
import { I_Draggable } from "../../../../drag/domain"
import { DiagramType, getRandomPosition, GlobalKey, HashTable, I_ViewBox, I_ViewPort, Nullable, Vector } from "../../../../general/domain"
import { I_RelationshipsStore } from "../../../../relationships/domain"
import { I_Diagram } from "../domain"
import { I_Element, I_ElementsStore } from "../element/domain"

export class Diagram implements I_Diagram {
	constructor(name: string, diagramType: DiagramType,
		elementsStore: I_ElementsStore, relationshipsStore: I_RelationshipsStore,
		viewBox: I_ViewBox, viewPort: I_ViewPort) {
		this._key = GlobalKey.getNewGlobalKey()
		this.name = name
		this._diagramType = diagramType
		this._elements = {}
		this._elementsStore = elementsStore
		this._relationshipsStore = relationshipsStore
		this.visible = true
		this.viewBox = viewBox
		this.viewPort = viewPort
	}
	viewBox: I_ViewBox
	viewPort: I_ViewPort

	private _elementsStore: I_ElementsStore
	private _relationshipsStore: I_RelationshipsStore

	private _key: string
	public get key(): string { return this._key }
	public name: string

	private _diagramType: DiagramType
	public get diagramType(): DiagramType { return this._diagramType }
	public visible: boolean

	private _elements: HashTable<I_Draggable<I_Element>>
	public get elements(): HashTable<I_Draggable<I_Element>> { return this._elements }

	public get rootElements(): HashTable<I_Element> { return this._elementsStore.elements }

	public get elementsStore(): I_ElementsStore { return this._elementsStore }
	public get relationshipsStore(): I_RelationshipsStore { return this._relationshipsStore }

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

	createElement(element: I_Element, x: Nullable<number> = null,
		y: Nullable<number> = null): void {
		this._elementsStore.addElement(element.key, element)
		this.addElement(element, x, y)
	}


	toJSON() {
		return {
			__type: "Diagram",
			...this
		}
	}

}
