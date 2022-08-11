import { Element, EventField } from '..'
import { ElementType } from '../../../..'

export class ComponentEntity extends Element {

    constructor(key: string = "") {
        super(ElementType.Component, key)
        this.props = []
        this.events = []
    }

    props: string[]
    events: EventField[]

    toJSON() {
        return {
            __type: "ComponentEntity",
            props: this.props,
            events: this.events,
            ...super.toJSON()
        }
    }
}
