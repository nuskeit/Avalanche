import {
    ElementsStore, Field_DTO, I_Field, I_TypeDef, Nullable,
    RootDiagram, RootDiagram_DTO,
    TypeDef_DTO
} from "../.."


export interface I_Reviver {

    createRootDiagram(rootDiagDto: RootDiagram_DTO): RootDiagram

    createField(elementsStore: ElementsStore, fieldDTO: Field_DTO): I_Field

    createTypeDef(elementsStore: ElementsStore, typeDef: Nullable<TypeDef_DTO>): Nullable<I_TypeDef>
}

