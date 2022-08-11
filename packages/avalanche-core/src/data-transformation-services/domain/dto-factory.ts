import {
    Diagram_DTO, Element_DTO, Field_DTO, I_Diagram, I_Element,
    I_Field, I_Parameter, I_TypeDef, Parameter_DTO, RootDiagram,
    RootDiagram_DTO, TypeDef_DTO
} from "../..";

export interface I_DtoFactory {

    createRootDiagramDto(rd: RootDiagram): RootDiagram_DTO

    createDiagramDto(d: I_Diagram): Diagram_DTO

    createElementDto(e: I_Element): Element_DTO

    createFieldDto(field: I_Field): Field_DTO

    creatParameterDto(p: I_Parameter): Parameter_DTO

    createTypeDefDto(t: I_TypeDef): TypeDef_DTO

}