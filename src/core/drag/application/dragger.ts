import * as g from "../../general"
import * as drag from "../../drag"

export class Dragger implements drag.domain.I_Dragger {
	private _key: string
	location: g.domain.I_Vector
	mouseLocation: g.domain.I_Vector

	constructor(
		key: string,
		location: g.domain.I_Vector,
		mouseLocation: g.domain.I_Vector
	) {
		this._key = key
		this.location = location
		this.mouseLocation = mouseLocation
	}

	public get key(): string { return this._key }

	toJSON() {
		return {
			__type: "Dragger",
			...this
		}
	}
}
