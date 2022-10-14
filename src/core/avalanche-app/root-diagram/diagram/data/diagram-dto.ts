import { DraggableElement_DTO } from "../../../../drag/data/draggable-element-dto"
import { DiagramType, I_ViewBox, I_ViewPort } from "../../../../general/domain"
import { Element_DTO } from "../element/data"

export interface I_Diagram_DTO {
	key: string
	name: string
	diagramType: DiagramType
	visible: boolean
	elements: DraggableElement_DTO[]
}

export class Diagram_DTO implements I_Diagram_DTO {
	key: string = ''
	name: string = ''

	diagramType: DiagramType = DiagramType.Block
	visible: boolean = true

	viewBox: I_ViewBox
	viewPort: I_ViewPort

	elements: DraggableElement_DTO[] = []

	constructor(
		key: string,
		name: string,
		diagramType: DiagramType,
		visible: boolean,
		elements: DraggableElement_DTO[],
		viewBox: I_ViewBox,
		viewPort: I_ViewPort
	) {
		this.key = key
		this.name = name
		this.diagramType = diagramType
		this.visible = visible
		this.elements = elements
		this.viewBox = viewBox
		this.viewPort = viewPort
	}
}