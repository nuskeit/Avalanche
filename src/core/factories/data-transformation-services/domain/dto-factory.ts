import { RootDiagram_DTO } from "../../../avalanche-app/root-diagram/data"
import { Diagram_DTO } from "../../../avalanche-app/root-diagram/diagram/data"
import { I_Diagram } from "../../../avalanche-app/root-diagram/diagram/domain"
import { Element_DTO } from "../../../avalanche-app/root-diagram/diagram/element/data"
import { I_Element } from "../../../avalanche-app/root-diagram/diagram/element/domain"
import { Field_DTO, Parameter_DTO } from "../../../avalanche-app/root-diagram/diagram/element/field/data"
import { I_Field, I_Parameter } from "../../../avalanche-app/root-diagram/diagram/element/field/domain"
import { TypeDef_DTO } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/data"
import { I_TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/domain"
import { I_RootDiagram } from "../../../avalanche-app/root-diagram/domain"
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