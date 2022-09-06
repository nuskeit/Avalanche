import * as draggable from "../../../../drag"
import * as g from "../../../../general"

export interface I_Diagram_DTO {
	key: string
	name: string
	diagramType: g.domain.DiagramType
	visible: boolean
	elements: draggable.data.Draggable_DTO<string>[]
}

export class Diagram_DTO implements I_Diagram_DTO {
	key: string = ''
	name: string = ''

	diagramType: g.domain.DiagramType = g.domain.DiagramType.Block
	visible: boolean = true

	viewBox: g.preseter.ViewBox
	viewPort: g.preseter.ViewPort

	elements: draggable.data.Draggable_DTO<string>[] = []

	constructor(
		key: string,
		name: string,
		diagramType: g.domain.DiagramType,
		visible: boolean,
		elements: draggable.data.Draggable_DTO<string>[],
		viewBox: g.preseter.ViewBox,
		viewPort: g.preseter.ViewPort
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