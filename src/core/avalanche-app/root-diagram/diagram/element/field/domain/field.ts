import * as g from "../../../../../../general"
import * as typeDef from "../type-def"

export interface I_Field {
	readonly key: string
	name: string
	text: string
	readonly fieldType: g.domain.FieldType
	/** 
	 * complex datatypes: Element, 
	 * method with elements as parameters and/or return value, 
	 * method with nested functions with element parameters, 
	 * events with elements as parameters  
	 */
	readonly dataTypeDef: g.domain.Nullable<typeDef.domain.I_TypeDef>
}

export abstract class Field implements I_Field {
	readonly key: string
	name: string
	text: string
	readonly fieldType: g.domain.FieldType
	dataTypeDef: g.domain.Nullable<typeDef.domain.I_TypeDef>

	constructor(name: string, fieldType: g.domain.FieldType, dataTypeDef: g.domain.Nullable<typeDef.domain.I_TypeDef>, key: string = "") {
		this.key = key === "" ? g.domain.GlobalKey.getNewGlobalKey() : key
		this.name = name
		this.text = ""
		this.fieldType = fieldType
		this.dataTypeDef = dataTypeDef
	}

	toJSON() {
		return {
			key: this.key,
			name: this.name,
			text: this.text,
			fieldType: this.fieldType,
			dataTypeDef: this.dataTypeDef,
		}
	}
}

