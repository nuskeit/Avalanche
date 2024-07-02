import { I_DraggableElement } from "../../drag/domain/draggable-element"
import { DiagramType, HashTable, I_ViewBox, I_ViewPort, I_Zoom, Size } from "../../general/domain"
import { I_ElementsRelationship } from "../../relationships/domain"
import { I_Element } from "../../element/domain"


export interface I_Diagram {
	readonly key: string
	name: string
	readonly diagramType: DiagramType
	readonly elements: HashTable<I_DraggableElement>
	//relationships: I_ElementsRelationship[]
	visible: boolean
	readonly viewBox: I_ViewBox
	readonly viewPort: I_ViewPort
	readonly zoom: I_Zoom

	addElement(element: I_Element, x?: number, y?: number, size?: Size): void

	removeElement(key: string): void

	// detectRelationshipsChanges(): void

	getRelationships(): I_ElementsRelationship[]

	removeRelationshipsByElement(key: string): void

	removeRelationshipsBySource(key: string): void

	removeRelationshipsByTarget(key: string): void

	addRelationship(rel: I_ElementsRelationship): void
}
