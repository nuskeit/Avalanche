import { FieldType, Nullable } from "../../../../../../general/domain"
import { TypeDef_DTO } from "../type-def/data"
import { Field_DTO } from "./field-dto"
import { Parameter_DTO } from "./parameter-dto"

export class MethodField_DTO extends Field_DTO {

	parameters: Parameter_DTO[]

	constructor(key: string,
		name: string,
		text: string,
		fieldType: FieldType,
		dataTypeDef: TypeDef_DTO,
		parameters: Nullable<Parameter_DTO[]>
	) {
		super(key
			, name
			, text
			, fieldType
			, dataTypeDef)
		if (parameters == null)
			this.parameters = []
		else
			this.parameters = parameters
	}

}
