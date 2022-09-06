import * as g from "../../../../../../general"
import * as typeDef from "../type-def"
import * as field from "../../field"

export class PropertyField_DTO extends field.data.Field_DTO {

	constructor(key: string,
		name: string,
		text: string,
		fieldType: g.domain.FieldType,
		dataTypeDef: g.domain.Nullable<typeDef.data.TypeDef_DTO>
	) {
		super(key
			, name
			, text
			, fieldType
			, dataTypeDef)
	}
}
