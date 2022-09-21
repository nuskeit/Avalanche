import { Vector } from "../../../general/domain";
import { I_GeneralFactory } from "../domain";

export class GeneralFactory implements I_GeneralFactory {
	private static singletonInstance: GeneralFactory | undefined

	private constructor() {

	}

	static getSingleton() {
		if (!this.singletonInstance)
			this.singletonInstance = new GeneralFactory()
		return this.singletonInstance
	}

	createVector(x: number, y: number) {
		return new Vector(x, y)
	}

}