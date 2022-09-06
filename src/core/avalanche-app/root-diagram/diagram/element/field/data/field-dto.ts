import { FieldType, Nullable } from "../../../../../../general/domain"
import { TypeDef_DTO } from "../type-def/data"
import { Parameter_DTO } from "./parameter-dto"

export interface I_Field_DTO {
	key: string
	name: string
	text: string
	fieldType: FieldType
	dataTypeDef: Nullable<TypeDef_DTO>
	parameters?: Nullable<Parameter_DTO[]>
}

export abstract class Field_DTO {
	key: string
	name: string
	text: string
	fieldType: FieldType
	dataTypeDef: TypeDef_DTO
	parameters?: Nullable<Parameter_DTO[]>

	constructor(key: string,
		name: string,
		text: string,
		fieldType: FieldType,
		dataTypeDef: TypeDef_DTO,
		parameters?: Nullable<Parameter_DTO[]>
	) {
		this.key = key
		this.name = name
		this.text = text
		this.fieldType = fieldType
		this.dataTypeDef = dataTypeDef
		this.parameters = parameters
	}

}
