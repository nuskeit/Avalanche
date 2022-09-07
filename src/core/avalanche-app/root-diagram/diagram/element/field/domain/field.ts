import { FieldType, GlobalKey, Nullable } from "../../../../../../general/domain"
import { I_TypeDef } from "../type-def/domain"

export interface I_Field {
	readonly key: string
	name: string
	text: string
	readonly fieldType: FieldType
	/** 
	 * complex datatypes: Element, 
	 * method with elements as parameters and/or return value, 
	 * method with nested functions with element parameters, 
	 * events with elements as parameters  
	 */
	readonly dataTypeDef: I_TypeDef
}

export abstract class Field implements I_Field {
	readonly key: string
	name: string
	text: string
	readonly fieldType: FieldType
	dataTypeDef: I_TypeDef

	constructor(name: string, fieldType: FieldType, dataTypeDef: I_TypeDef, key: string = "") {
		this.key = key === "" ? GlobalKey.getNewGlobalKey() : key
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

