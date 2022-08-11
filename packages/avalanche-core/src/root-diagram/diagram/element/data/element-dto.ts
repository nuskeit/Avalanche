import { ElementType } from "../../../.."
import { Field_DTO, I_Field_DTO } from ".."

export interface I_Element_DTO {
    key: string
    name: string
    visible: boolean
    elementType: ElementType
    fields: I_Field_DTO[]
}

export class Element_DTO {
    key: string = ''
    name: string = ''
    visible: boolean = true
    elementType: ElementType = ElementType.Block
    fields: Field_DTO[]

    constructor(key: string,
        name: string,
        visible: boolean,
        elementType: ElementType,
        fields: Field_DTO[]
    ) {
        this.key = key
        this.name = name
        this.visible = visible
        this.elementType = elementType
        this.fields = fields
    }

}