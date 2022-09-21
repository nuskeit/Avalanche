import { CreationType, I_Factory } from "../domain"

export class Factory implements I_Factory {

	static CreationType= CreationType

	protected static instance: I_Factory | undefined

	protected constructor() { }

	public static getSignleton(): I_Factory {
		if (this.instance == undefined)
			this.instance = new Factory()
		return this.instance
	}

	create(t:CreationType): any {

	}
}
