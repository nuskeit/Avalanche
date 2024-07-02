import { RootDiagram_DTO } from "../../../root-diagram/data"
import { Diagram_DTO } from "../../../diagram/data"
import { I_Diagram } from "../../../diagram/domain"
import { Element_DTO } from "../../../element/data"
import { I_Element } from "../../../element/domain"
import { Field_DTO, Parameter_DTO } from "../../../field/data"
import { I_Field, I_Parameter } from "../../../field/domain"
import { TypeDef_DTO } from "../../../type-def/data"
import { I_TypeDef } from "../../../type-def/domain"
import { I_RootDiagram } from "../../../root-diagram/domain"
import { DraggableElement_DTO } from "../../../drag/data/draggable-element-dto"
import { I_DraggableElement } from "../../../drag/domain/draggable-element"

export interface I_DtoFactory {

	createRootDiagramDto(rd: I_RootDiagram): RootDiagram_DTO

	createDiagramDto(d: I_Diagram): Diagram_DTO

	createElementDto(e: I_Element): Element_DTO

	createDraggableElementDto(e: I_DraggableElement): DraggableElement_DTO

	createFieldDto(field: I_Field): Field_DTO

	creatParameterDto(p: I_Parameter): Parameter_DTO

	createTypeDefDto(t: I_TypeDef): TypeDef_DTO

}