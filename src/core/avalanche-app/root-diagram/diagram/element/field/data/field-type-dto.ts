import { FieldType } from "../../../../../../general/domain"

export class FieldTypeDTO {
	key: string
	value: FieldType


	constructor(code: string, value: FieldType) {
		this.key = code
		this.value = value
	}

}