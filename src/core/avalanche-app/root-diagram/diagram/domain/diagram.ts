import { I_Draggable } from "../../../../drag/domain"
import { DiagramType, HashTable, I_ViewBox, I_ViewPort } from "../../../../general/domain"
import { I_ElementsRelationship } from "../../../../relationships/domain"
import { I_Element } from "../element/domain"


export interface I_Diagram {
	readonly key: string
	name: string
	readonly diagramType: DiagramType
	readonly elements: HashTable<I_Draggable<I_Element>>
	relationships: I_ElementsRelationship[]
	visible: boolean
	readonly viewBox: I_ViewBox
	readonly viewPort: I_ViewPort

	addElement(element: I_Element): void

	detectRelationshipsChanges(): void
}
