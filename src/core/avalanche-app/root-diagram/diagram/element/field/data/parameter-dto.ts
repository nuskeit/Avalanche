// import * as g from "../../../../../../general"
// import * as field from "../../field"
// import * as typeDef from "../type-def"

import { Nullable, ParamDirection, ParamValRef } from "../../../../../../general/domain"
import { TypeDef_DTO } from "../type-def/data"

// export interface I_Parameter_DTO {
// 	key: string
// 	name: string
// 	direction: ParamDirection
// 	category: ParamValRef
// 	dataTypeDef: TypeDef_DTO
// }

export class Parameter_DTO {
	key: string
	name: string
	direction: ParamDirection
	category: ParamValRef
	dataTypeDef: TypeDef_DTO

	constructor(
		key: string,
		name: string,
		direction: ParamDirection,
		category: ParamValRef,
		dataTypeDef: TypeDef_DTO
	) {
		this.key = key
		this.name = name
		this.direction = direction
		this.category = category
		this.dataTypeDef = dataTypeDef
	}
}