import { DataType, Nullable } from "../../../../../../../general/domain"
import { I_Element } from "../../../domain"

export interface I_TypeDef {
	readonly key: string
	readonly name: string
	/**
	 * Reference to dynamic elemnts that will become virtual DataType of the elements's field
	 */
	 readonly refElement: Nullable<I_Element>
	/**
	 * Data Type to use when the associated (refKey) element is null 
	 */
	readonly fallbackDataType: DataType

	/**
	 * triggers when ref-type is changed with two parameters: oldValue:Nullable<I_Element> and newValue:Nullable<I_Element>
	 */
	 event_refElement_changed?: Function

}
