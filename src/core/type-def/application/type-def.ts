import { DataType, GlobalKey, I_Serializable, Nullable } from "../../general/domain";
import { I_Element } from "../../element/domain";
import { I_TypeDef } from "../domain";


export class TypeDef implements I_TypeDef, I_Serializable {
	fallbackDataType: DataType

	//@ts-ignore, "_refElement" is set throught it's setter "refElement" in the constructor 
	private _refElement: Nullable<I_Element>

	key: string

	event_refElement_changed?: Function

	get name(): string { return this.getName() }

	get refElement(): Nullable<I_Element> { return this._refElement }
	set refElement(value: Nullable<I_Element>) {
		const oldValue = this._refElement
		this._refElement = value;

		if (this.event_refElement_changed)
			this.event_refElement_changed(oldValue, value)
	}


	private getName(): string {
		if (this.refElement != null) {
			return this.refElement.name
		}
		return this.fallbackDataType
	}

	constructor(fallbackDataType: DataType, refElement: Nullable<I_Element> = null, key?: string) {
		this.refElement = refElement
		this.fallbackDataType = fallbackDataType
		if (key) this.key = key
		else this.key = GlobalKey.getNewGlobalKey()
	}


	toJSON() {
		return {
			__type: "TypeDef",
			...this
		}
	}


}