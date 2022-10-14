import { FieldType, Nullable, Scope } from "../../../../../../general/domain"
import { TypeDef_DTO } from "../type-def/data"
import { Field_DTO } from "./field-dto"

export class PropertyField_DTO extends Field_DTO {

	constructor(key: string,
		name: string,
		description: string,
		scope: Scope,
		fieldType: FieldType,
		dataTypeDef: TypeDef_DTO
	) {
		super(key,
			name,
			description,
			scope,
			fieldType,
			dataTypeDef)
	}
}
