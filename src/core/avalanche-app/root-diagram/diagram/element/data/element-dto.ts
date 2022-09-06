import * as g from "../../../../../general"
import * as field from "../field"

export interface I_Element_DTO {
	key: string
	name: string
	visible: boolean
	elementType: g.domain.ElementType
	fields: field.data.I_Field_DTO[]
}

export class Element_DTO {
	key: string = ''
	name: string = ''
	visible: boolean = true
	elementType: g.domain.ElementType = g.domain.ElementType.Block
	fields: field.data.Field_DTO[]

	constructor(key: string,
		name: string,
		visible: boolean,
		elementType: g.domain.ElementType,
		fields: field.data.Field_DTO[]
	) {
		this.key = key
		this.name = name
		this.visible = visible
		this.elementType = elementType
		this.fields = fields
	}

}