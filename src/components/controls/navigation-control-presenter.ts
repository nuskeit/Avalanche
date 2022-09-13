
import { I_Presenter } from '../../core/general/presenter';

export class NavigationControlPresenter implements I_Presenter<void> {
	lastPressed: string

	sideSize = 63

	constructor(naigationDelegate: Function) {
		this.lastPressed = ""
		this.delegates = { naigationDelegate }
	}

	readonly proxies: {} | undefined

	readonly delegates: {
		naigationDelegate: Function
	}

	diagFactor = 0.707
	readonly eventsHandler = {
		emitUL: () => {
			this.lastPressed = 'ul';
			this.delegates.naigationDelegate({ x: -this.diagFactor, y: -this.diagFactor })
		},
		emitU: () => {
			this.lastPressed = 'u';
			this.delegates.naigationDelegate({ x: 0, y: -1 })
		},
		emitUR: () => {
			this.lastPressed = 'ur';
			this.delegates.naigationDelegate({ x: this.diagFactor, y: -this.diagFactor })
		},
		emitL: () => {
			this.lastPressed = 'l';
			this.delegates.naigationDelegate({ x: -1, y: 0 })
		},
		emitC: () => {
			this.lastPressed = 'c';
			this.delegates.naigationDelegate({ x: 0, y: 0 })
		},
		emitR: () => {
			this.lastPressed = 'r';
			this.delegates.naigationDelegate({ x: 1, y: 0 })
		},
		emitDL: () => {
			this.lastPressed = 'dl';
			this.delegates.naigationDelegate({ x: -this.diagFactor, y: this.diagFactor })
		},
		emitD: () => {
			this.lastPressed = 'd';
			this.delegates.naigationDelegate({ x: 0, y: 1 })
		},
		emitDR: () => {
			this.lastPressed = 'dr';
			this.delegates.naigationDelegate({ x: this.diagFactor, y: this.diagFactor })
		},
	}
}
