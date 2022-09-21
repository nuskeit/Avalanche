import { FieldType, Nullable } from "../../../../../../general/domain"
import { TypeDef_DTO } from "../type-def/data"
import { Field_DTO } from "./field-dto"

export class PropertyField_DTO extends Field_DTO {

	constructor(key: string,
		name: string,
		text: string,
		fieldType: FieldType,
		dataTypeDef: TypeDef_DTO
	) {
		super(key
			, name
			, text
			, fieldType
			, dataTypeDef)
	}
}
