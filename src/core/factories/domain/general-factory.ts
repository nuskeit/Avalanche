import * as elementNS from "../../avalanche-app/root-diagram/diagram/element"
import * as fieldNS from "../../avalanche-app/root-diagram/diagram/element/field"
import * as typeDefNS from "../../avalanche-app/root-diagram/diagram/element/field/type-def"
import * as g from "../../general"
import { I_RelationshipsStore } from "../../relationships/domain"

export interface I_GeneralFactory {

	relationshipsStore: I_RelationshipsStore

	createElement(elementType: g.domain.ElementType, key?: string): elementNS.domain.I_Element

	createField(name: string, fieldType: g.domain.FieldType, dataTypeDef: typeDefNS.domain.I_TypeDef,
		parameters: g.domain.Nullable<fieldNS.domain.I_Parameter[]>, key?: string): fieldNS.domain.I_Field

	createTypeDef(fallbackDataType: g.domain.DataType, refElement: g.domain.Nullable<elementNS.domain.I_Element>)
		: g.domain.Nullable<typeDefNS.domain.I_TypeDef>

}

