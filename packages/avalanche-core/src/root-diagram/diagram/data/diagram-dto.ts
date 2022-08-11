import { DiagramType, DraggableWrapper_DTO } from "../../.."

export interface I_Diagram_DTO {
    key: string
    name: string
    diagramType: DiagramType
    visible: boolean
    elements: DraggableWrapper_DTO<string>[]
}

export class Diagram_DTO implements I_Diagram_DTO {
    key: string = ''
    name: string = ''

    diagramType: DiagramType = DiagramType.Block
    visible: boolean = true

    elements: DraggableWrapper_DTO<string>[] = []

    constructor(
        key: string,
        name: string,
        diagramType: DiagramType,
        visible: boolean,
        elements: DraggableWrapper_DTO<string>[]

    ) {
        this.key = key
        this.name = name
        this.diagramType = diagramType
        this.visible = visible
        this.elements = elements
    }
}