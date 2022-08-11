import { ElementType } from '../../../..'
import { Element } from '..'

export class EnumEntity extends Element {

    constructor(key: string = "") {
        super(ElementType.Enum, key)
    }

    toJSON() {
        return {
            __type: "EnumEntity",
            ...super.toJSON()
        }
    }
}
