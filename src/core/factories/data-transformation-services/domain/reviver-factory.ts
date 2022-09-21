import * as rootDiagramNS from "../../../avalanche-app/root-diagram"
import * as elementNS from "../../../avalanche-app/root-diagram/diagram/element"
import * as fieldNS from "../../../avalanche-app/root-diagram/diagram/element/field"
import * as typeDefNS from "../../../avalanche-app/root-diagram/diagram/element/field/type-def"
import * as g from "../../../general"


export interface I_Reviver {

	createRootDiagram(rootDiagDto: rootDiagramNS.data.RootDiagram_DTO): rootDiagramNS.application.RootDiagram

	createField(elementsStore: elementNS.data.ElementsStore, fieldDTO: fieldNS.data.Field_DTO): fieldNS.domain.I_Field

	createTypeDef(elementsStore: elementNS.data.ElementsStore,
		typeDef: g.domain.Nullable<typeDefNS.data.TypeDef_DTO>): g.domain.Nullable<typeDefNS.domain.I_TypeDef>
}

