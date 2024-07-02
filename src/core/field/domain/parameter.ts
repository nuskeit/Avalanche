import { I_Validable, Nullable, ParamDirection, ParamValRef } from "../../general/domain"
import { I_TypeDef } from "../../type-def/domain"

export interface I_Parameter extends I_Validable {
	key: string
	name: string
	direction: ParamDirection
	category: ParamValRef
	dataTypeDef: I_TypeDef
}
