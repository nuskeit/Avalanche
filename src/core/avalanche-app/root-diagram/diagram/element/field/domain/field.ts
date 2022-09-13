import { FieldType, GlobalKey, isUndefOrNull, Nullable } from "../../../../../../general/domain"
import { I_TypeDef } from "../type-def/domain"
import { I_Parameter } from "./parameter"

export interface I_Field {
	readonly key: string
	name: string
	text: string
	parameters?: I_Parameter[]
	readonly fieldType: FieldType
	event_dataTypeDef_changed?: Function
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

	//@ts-ignore, initialized through setter
	_dataTypeDef: I_TypeDef
	get dataTypeDef(): I_TypeDef { return this._dataTypeDef }
	set dataTypeDef(value: I_TypeDef) {
		const oldValue = this._dataTypeDef
		this._dataTypeDef = value
		if (this._dataTypeDef && this.event_dataTypeDef_changed)
			this._dataTypeDef.event_refElement_changed = this.event_dataTypeDef_changed
		if (this.event_dataTypeDef_changed)
			this.event_dataTypeDef_changed(oldValue, value)
	}

	_event_dataTypeDef_changed?: Function
	get event_dataTypeDef_changed(): Function | undefined { return this._event_dataTypeDef_changed }
	set event_dataTypeDef_changed(value: Function | undefined) {
		this._event_dataTypeDef_changed = value
		this._dataTypeDef.event_refElement_changed = this.event_dataTypeDef_changed
	}


	constructor(name: string, fieldType: FieldType, dataTypeDef: I_TypeDef, key: string = "") {
		this.key = key === "" || isUndefOrNull(key) ? GlobalKey.getNewGlobalKey() : key
		this.name = name
		this.text = ""
		this.fieldType = fieldType
		this.dataTypeDef = dataTypeDef
		dataTypeDefChanged: Function
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

