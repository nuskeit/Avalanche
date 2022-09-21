import { Draggable_DTO } from "../../../../drag/data"
import { DiagramType, I_ViewBox, I_ViewPort } from "../../../../general/domain"

export interface I_Diagram_DTO {
	key: string
	name: string
	diagramType: DiagramType
	visible: boolean
	elements: Draggable_DTO<string>[]
}

export class Diagram_DTO implements I_Diagram_DTO {
	key: string = ''
	name: string = ''

	diagramType: DiagramType = DiagramType.Block
	visible: boolean = true

	viewBox: I_ViewBox
	viewPort: I_ViewPort

	elements: Draggable_DTO<string>[] = []

	constructor(
		key: string,
		name: string,
		diagramType: DiagramType,
		visible: boolean,
		elements: Draggable_DTO<string>[],
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