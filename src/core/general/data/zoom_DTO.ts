
export class Zoom_DTO {
	factor: number
	minFactor: number
	maxFactor: number

	constructor(
		factor: number = 1,
		minFactor: number = .1,
		maxFactor: number = 2
	) {
		this.factor = factor
		this.minFactor = minFactor
		this.maxFactor = maxFactor
	}
}
