import { ElementType } from '../../../..'
import { Element } from './element'

export class InterfaceEntity extends Element {

    constructor(key: string = "") {
        super(ElementType.Interface, key)
    }

    toJSON() {
        return {
            __type: "InterfaceEntity",
            ...super.toJSON()
        }
    }
}
