import { I_Zoom, I_Serializable, I_ViewBox, I_ViewPort } from "../domain"

export class Zoom implements I_Zoom, I_Serializable {
	_factor: number
	readonly _minFactor: number
	readonly _maxFactor: number
	_increment = .1

	constructor(
		_factor: number = 1,
		_minFactor: number = .1,
		_maxFactor: number = 2
	) {
		this._factor = _factor
		this._minFactor = Number(Math.min(Math.max(_minFactor, .1), 1.9))
		this._maxFactor = Number(Math.min(Math.max(this._minFactor, _maxFactor), 2))
	}

	get minFactor(): number { return this._minFactor }
	get maxFactor(): number { return this._maxFactor }

	get factor(): number { return this._factor }
	set factor(value: number) {
		this._factor = parseFloat(Number(Math.min(Math.max(this._minFactor, value), this._maxFactor)).toPrecision(2))
	}

	get percentage(): number {
		return Math.round(this._factor * 100)
	}



	get canZoomIn(): boolean { return this._factor < this._maxFactor }
	get canZoomOut(): boolean { return this._factor > this._minFactor }


	zoomIn(viewBox: I_ViewBox, viewPort: I_ViewPort): void {
		const _prev = this.factor
		this.factor += this._increment
		if (_prev == this.factor) return
		this.doZoom(viewBox, viewPort)
	}

	zoomOut(viewBox: I_ViewBox, viewPort: I_ViewPort): void {
		const _prev = this.factor
		this.factor -= this._increment
		if (_prev == this.factor) return
		this.doZoom(viewBox, viewPort)
	}

	zoomReset(viewBox: I_ViewBox, viewPort: I_ViewPort): void {
		this.factor = 1
		this.doZoom(viewBox, viewPort)
	}

	doZoom(viewBox: I_ViewBox, viewPort: I_ViewPort): void {

		const iniW = viewBox.width
		const iniH = viewBox.height
		viewBox.width = viewPort.width / this._factor
		viewBox.height = viewPort.height / this._factor
		viewBox.x -= (viewBox.width - iniW) / 2
		viewBox.y -= (viewBox.height - iniH) / 2

	}

	toJSON() {
		return {
			__type: "Zoom",
			...this
		}
	}
}