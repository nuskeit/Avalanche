import { DataType, GlobalKey, I_Serializable, Nullable } from "../../../../../../../general/domain";
import { I_Element } from "../../../domain";
import { I_TypeDef } from "../domain";


export class TypeDef implements I_TypeDef, I_Serializable {
	fallbackDataType: DataType
	/**
	 * Reference to dynamic elemnts that will become virtual DataType of the elements's field
	 */
	refElement: Nullable<I_Element>

	key: string

	get name(): string { return this.getName() }

	private getName(): string {
		if (this.refElement != null) {
			return this.refElement.name
		}
		return this.fallbackDataType
	}

	constructor(key: string | undefined, fallbackDataType: DataType, refElement: Nullable<I_Element> = null) {
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