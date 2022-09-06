import * as drag from "../../../../drag"
import * as g from "../../../../general"
import * as relationships from "../../../../relationships"
import * as elem from "../element/"


export interface I_Diagram {
	readonly key: string
	name: string
	readonly diagramType: g.domain.DiagramType
	readonly elements: g.domain.HashTable<drag.domain.I_Draggable<elem.domain.I_Element>>
	readonly elementsStore: elem.domain.I_ElementsStore
	readonly relationshipsStore: relationships.domain.I_RelationsStore
	readonly rootElements: g.domain.HashTable<elem.domain.I_Element>
	visible: boolean

	// NOT USED IN DOMAIN!!!!!
	readonly viewBox: g.preseter.ViewBox
	readonly viewPort: g.preseter.ViewPort

	addElement(element: elem.domain.I_Element): void
	createElement(element: elem.domain.I_Element): void

}
