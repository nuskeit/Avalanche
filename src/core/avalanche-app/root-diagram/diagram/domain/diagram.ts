import { I_Draggable } from "../../../../drag/domain"
import { HashTable, I_ViewBox, I_ViewPort } from "../../../../general/domain"
import { I_RelationshipsStore } from "../../../../relationships/domain"
import { I_Element, I_ElementsStore } from "../element/domain"


export interface I_Diagram {
	readonly key: string
	name: string
	readonly diagramType: DiagramType
	readonly elements: HashTable<I_Draggable<I_Element>>
	readonly elementsStore: I_ElementsStore
	readonly relationshipsStore: I_RelationshipsStore
	readonly rootElements: HashTable<I_Element>
	visible: boolean

	// NOT USED IN DOMAIN!!!!!
	readonly viewBox: I_ViewBox
	readonly viewPort: I_ViewPort

	addElement(element: I_Element): void
	createElement(element: I_Element): void

}
