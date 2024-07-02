import { DraggableElement_DTO } from "../../drag/data/draggable-element-dto"
import { Zoom_DTO } from "../../general/data/zoom_DTO"
import { DiagramType, I_ViewBox, I_ViewPort } from "../../general/domain"
import { ElementsRelationship } from "../../relationships/application"
import { ElementsRelationship_DTO } from "../../relationships/data"

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

	diagramType: DiagramType = DiagramType.Generic
	visible: boolean = true

	viewBox: I_ViewBox
	viewPort: I_ViewPort

	zoom: Zoom_DTO

	elements: DraggableElement_DTO[] = []

	constructor(
		key: string,
		name: string,
		diagramType: DiagramType,
		visible: boolean,
		elements: DraggableElement_DTO[],
		viewBox: I_ViewBox,
		viewPort: I_ViewPort,
		zoom: Zoom_DTO
	) {
		this.key = key
		this.name = name
		this.diagramType = diagramType
		this.visible = visible
		this.elements = elements
		this.viewBox = viewBox
		this.viewPort = viewPort
		this.zoom = zoom
	}
}