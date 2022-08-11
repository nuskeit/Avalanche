import { I_Element } from "../../..";
import { DataType, Nullable } from "../../../../../..";

export interface I_TypeDef {
    readonly name: string
    /**
     * Reference to dynamic elemnts that will become virtual DataType of the elements's field
     */
    readonly refElement: Nullable<I_Element>
    /**
     * Data Type to use when the associated (refKey) element is null 
     */
    readonly fallbackDataType: DataType

}

export class TypeDef implements I_TypeDef {
    fallbackDataType: DataType
    /**
     * Reference to dynamic elemnts that will become virtual DataType of the elements's field
     */
    refElement: Nullable<I_Element>

    get name(): string { return this.getName() }

    private getName(): string {
        if (this.refElement != null) {
            return this.refElement.name
        }
        return this.fallbackDataType
    }

    constructor(fallbackDataType: DataType, refElement: Nullable<I_Element> = null) {
        this.refElement = refElement
        this.fallbackDataType = fallbackDataType
    }


}