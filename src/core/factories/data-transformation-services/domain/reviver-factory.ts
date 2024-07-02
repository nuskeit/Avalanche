import * as rootDiagramNS from "../../../root-diagram"
import * as elementNS from "../../../element"
import * as fieldNS from "../../../field"
import * as typeDefNS from "../../../type-def"
import * as g from "../../../general"


export interface I_Reviver {

	createRootDiagram(rootDiagDto: rootDiagramNS.data.RootDiagram_DTO): rootDiagramNS.application.RootDiagram

	createField(elementsStore: elementNS.data.ElementsStore, fieldDTO: fieldNS.data.Field_DTO): fieldNS.domain.I_Field

	createTypeDef(elementsStore: elementNS.data.ElementsStore,
		typeDef: g.domain.Nullable<typeDefNS.data.TypeDef_DTO>): g.domain.Nullable<typeDefNS.domain.I_TypeDef>
}

