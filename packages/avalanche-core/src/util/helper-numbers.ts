export class HelperNumbers {
	
	static invalidToInfinity(val: any): number {
		if (val == undefined || val == null || typeof val != "number")
			return Infinity
		else
			return val
	}

	static getRandomInt(max: number): number {
		return Math.floor(Math.random() * max);
	}
}

