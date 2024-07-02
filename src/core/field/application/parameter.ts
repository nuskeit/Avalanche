import { HashTable, ParamDirection, ParamValRef } from "../../general/domain"
import { I_Parameter } from "../domain"
import { I_TypeDef } from "../../type-def/domain"

export class Parameter implements I_Parameter {
	key: string
	name: string
	direction: ParamDirection
	category: ParamValRef
	dataTypeDef: I_TypeDef

	constructor(
		key: string,
		name: string,
		direction: ParamDirection,
		category: ParamValRef,
		dataTypeDef: I_TypeDef

	) {
		this.key = key
		this.name = name
		this.direction = direction
		this.category = category
		this.dataTypeDef = dataTypeDef
	}

	toJSON() {
		return {
			__type: "Parameter",
			...this
		}
	}


	// validation
	validate(): void {
		this._validProp['name'] = this.name.indexOf(' ') == -1
		this._valid = this._validProp['name']
	}

	private _valid = false
	get valid(): boolean {
		this.validate()
		return this._valid
	}

	private _validProp: HashTable<boolean> = {}
	get validProp(): HashTable<boolean> {
		this.validate()
		return this._validProp
	}
}
