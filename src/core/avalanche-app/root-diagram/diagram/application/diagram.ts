import * as drag from "../../../../drag"
import * as g from "../../../../general"
import * as relationships from "../../../../relationships"
import * as diag from "../../diagram"
import * as elem from "../element"

export class Diagram implements diag.domain.I_Diagram {
	constructor(name: string, diagramType: g.domain.DiagramType,
		elementsStore: elem.domain.I_ElementsStore, relationshipsStore: relationships.domain.I_RelationsStore,
		viewBox: g.preseter.ViewBox, viewPort: g.preseter.ViewPort) {
		this._key = g.domain.GlobalKey.getNewGlobalKey()
		this.name = name
		this._diagramType = diagramType
		this._elements = {}
		this._elementsStore = elementsStore
		this._relationshipsStore = relationshipsStore
		this.visible = true
		this.viewBox = viewBox
		this.viewPort = viewPort
	}
	viewBox: g.preseter.ViewBox
	viewPort: g.preseter.ViewPort

	private _elementsStore: elem.domain.I_ElementsStore
	private _relationshipsStore: relationships.domain.I_RelationsStore

	private _key: string
	public get key(): string { return this._key }
	public name: string

	private _diagramType: g.domain.DiagramType
	public get diagramType(): g.domain.DiagramType { return this._diagramType }
	public visible: boolean

	private _elements: g.domain.HashTable<drag.domain.I_Draggable<elem.domain.I_Element>>
	public get elements(): g.domain.HashTable<drag.domain.I_Draggable<elem.domain.I_Element>> { return this._elements }

	public get rootElements(): g.domain.HashTable<elem.domain.I_Element> { return this._elementsStore.elements }

	public get elementsStore(): elem.domain.I_ElementsStore { return this._elementsStore }
	public get relationshipsStore(): relationships.domain.I_RelationsStore { return this._relationshipsStore }

	addElement(element: elem.domain.I_Element, x: g.domain.Nullable<number> = null,
		y: g.domain.Nullable<number> = null, width: number = 180): void {
		let _x: number, _y: number
		if (x == null) _x = g.domain.getRandomPosition(300, 50); else _x = x
		if (y == null) _y = g.domain.getRandomPosition(200, 50); else _y = y
		this.elements[element.key] = new drag.application.Draggable<elem.domain.I_Element>(element,
			new drag.application.Dragger(element.key,
				new g.domain.Vector(_x, _y),
				new g.domain.Vector(_x, _y))
		)
	}

	createElement(element: elem.domain.I_Element, x: g.domain.Nullable<number> = null,
		y: g.domain.Nullable<number> = null): void {
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
