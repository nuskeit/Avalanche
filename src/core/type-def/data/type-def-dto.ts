import { DataType, Nullable } from "../../general/domain"

export class TypeDef_DTO {
	key: string
	name: string
	fallbackDataType: DataType
	refElementKey: Nullable<string>

	constructor(key: string, name: string, fallbackDataType: DataType, refElementKey: Nullable<string>) {
		this.key = key
		this.name = name
		this.fallbackDataType = fallbackDataType
		this.refElementKey = refElementKey
	}

}