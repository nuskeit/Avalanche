import { I_DraggableElement } from "../../../../drag/domain/draggable-element"
import { DiagramType, HashTable, I_ViewBox, I_ViewPort, Size } from "../../../../general/domain"
import { I_ElementsRelationship } from "../../../../relationships/domain"
import { I_Element } from "../element/domain"


export interface I_Diagram {
	readonly key: string
	name: string
	readonly diagramType: DiagramType
	readonly elements: HashTable<I_DraggableElement>
	relationships: I_ElementsRelationship[]
	visible: boolean
	readonly viewBox: I_ViewBox
	readonly viewPort: I_ViewPort

	addElement(element: I_Element, x?: number, y?: number, size?: Size): void

	removeElement(key: string): void

	detectRelationshipsChanges(): void
}
