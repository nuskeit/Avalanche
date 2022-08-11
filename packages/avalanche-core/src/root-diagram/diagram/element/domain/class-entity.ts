import { ElementType } from '../../../..'
import { Element } from '..'

export class ClassEntity extends Element {

    constructor(key: string = "") {
        super(ElementType.Class, key)
    }

    toJSON() {
        return {
            __type: "ClassEntity",
            ...super.toJSON()
        }
    }
}
