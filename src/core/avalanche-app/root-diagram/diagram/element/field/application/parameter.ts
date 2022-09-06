import { ParamDirection, ParamValRef } from "../../../../../../general/domain"
import { I_Parameter } from "../domain"
import { I_TypeDef } from "../type-def/domain"

export class Parameter implements I_Parameter {
	key: string
	name: string
	direction: ParamDirection
	category: ParamValRef
	dataTypeDef: I_TypeDef

	constructor(
		key: string,
		name: string,
		direction: ParamDirection,
		category: ParamValRef,
		dataTypeDef: I_TypeDef

	) {
		this.key = key
		this.name = name
		this.direction = direction
		this.category = category
		this.dataTypeDef = dataTypeDef
	}
}