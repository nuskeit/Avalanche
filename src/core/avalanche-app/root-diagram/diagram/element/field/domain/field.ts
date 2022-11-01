import { defaultValue, FieldType, GlobalKey, HashTable, I_Validable, Scope } from "../../../../../../general/domain";
import { I_TypeDef } from "../type-def/domain";
import { I_Parameter } from "./parameter";

export interface I_Field extends I_Validable {
	readonly key: string
	name: string
	scope: Scope
	readonly scopeSymbol: string
	description: string
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
	valid: boolean
}

export abstract class Field implements I_Field {
	readonly key: string

	name: string
	scope: Scope
	get scopeSymbol(): string {
		if (this.scope == Scope.Public) return '+'
		if (this.scope == Scope.Package) return '#'
		if (this.scope == Scope.Protected) return '~'
		if (this.scope == Scope.Private) return '-'
		return ''
	}
	description: string
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


	constructor(name: string, description: string, scope: Scope, fieldType: FieldType, dataTypeDef: I_TypeDef, key: string = "") {
		this.key = defaultValue<string>(key, [undefined, null, ""], GlobalKey.getNewGlobalKey())
		this.name = name
		this.description = description
		this.scope = scope
		this.fieldType = fieldType
		this.dataTypeDef = dataTypeDef
	}

	// validation
	validate(): boolean {
		const firtsLetter = this.name.substring(0, 1)
		this._validProp['name'] = this.name.indexOf(' ') == -1
			&& this.name != ''
			&& !(firtsLetter >= '0' && firtsLetter <= '9')
		return this.validProp['name']
	}

	protected _valid = false
	get valid(): boolean {
		return this.validate()
	}

	protected _validProp: HashTable<boolean> = {}
	get validProp(): HashTable<boolean> {
		return this._validProp
	}

}
