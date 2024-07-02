import { FieldType, Nullable, Scope } from "../../general/domain"
import { TypeDef_DTO } from "../../type-def/data"
import { Parameter_DTO } from "./parameter-dto"

export interface I_Field_DTO {
	key: string
	name: string
	description: string
	scope: Scope,
	fieldType: FieldType
	dataTypeDef: Nullable<TypeDef_DTO>
	parameters?: Parameter_DTO[]
}

export abstract class Field_DTO {
	key: string
	name: string
	description: string
	scope: Scope
	fieldType: FieldType
	dataTypeDef: TypeDef_DTO
	parameters?: Parameter_DTO[]

	constructor(key: string,
		name: string,
		description: string,
		scope: Scope,
		fieldType: FieldType,
		dataTypeDef: TypeDef_DTO,
		parameters?: Parameter_DTO[]
	) {
		this.key = key
		this.name = name
		this.description = description
		this.scope = scope
		this.fieldType = fieldType
		this.dataTypeDef = dataTypeDef
		this.parameters = parameters
	}

}
