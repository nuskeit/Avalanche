import { ElementType } from '../../../..'
import { Element } from '..'

export class BlockEntity extends Element {

    constructor(key: string = "") {
        super(ElementType.Block, key)
    }

    toJSON() {
        return {
            __type: "BlockEntity",
            ...super.toJSON()
        }
    }
}
