import { DataType } from "../../../../.."

export class EventField {
    name: string
    dataType: DataType

    constructor(name: string, dataType: DataType) {
        this.name = name
        this.dataType = dataType
    }

    toJSON() {
        return {
            __type: "EventField",
            ...this
        }
    }

    Revive(data: any) {
        return new EventField(data['name'], data['dataType'])
    }

}