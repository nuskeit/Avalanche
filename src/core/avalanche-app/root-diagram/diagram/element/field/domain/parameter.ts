import { Nullable, ParamDirection, ParamValRef } from "../../../../../../general/domain"
import { I_TypeDef } from "../type-def/domain"

export interface I_Parameter {
	key: string
	name: string
	direction: ParamDirection
	category: ParamValRef
	dataTypeDef: I_TypeDef
}
