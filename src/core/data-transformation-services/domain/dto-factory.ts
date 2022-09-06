import * as rootDiagramNS from "../../avalanche-app/root-diagram"
import * as diagramNS from "../../avalanche-app/root-diagram/diagram"
import * as elementNS from "../../avalanche-app/root-diagram/diagram/element"
import * as fieldNS from "../../avalanche-app/root-diagram/diagram/element/field"
import * as typeDefNS from "../../avalanche-app/root-diagram/diagram/element/field/type-def"

export interface I_DtoFactory {

	createRootDiagramDto(rd: rootDiagramNS.application.RootDiagram): rootDiagramNS.data.RootDiagram_DTO

	createDiagramDto(d: diagramNS.domain.I_Diagram): diagramNS.data.Diagram_DTO

	createElementDto(e: elementNS.domain.I_Element): elementNS.data.Element_DTO

	createFieldDto(field: fieldNS.domain.I_Field): fieldNS.data.Field_DTO

	creatParameterDto(p: fieldNS.domain.I_Parameter): fieldNS.data.Parameter_DTO

	createTypeDefDto(t: typeDefNS.domain.I_TypeDef): typeDefNS.data.TypeDef_DTO

}