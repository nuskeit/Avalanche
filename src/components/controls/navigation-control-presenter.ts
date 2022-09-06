
import { I_Presenter } from '../../core/general/presenter';

export class NavigationControlPresenter implements I_Presenter<void> {
	lastPressed: string

	sideSize = 63

	constructor(emit: Function) {
		this.lastPressed = ""
		this.delegates = { emit }
	}

	// @ts-ignore REVIEW!!
	proxy: Function

	delegates: {
		emit: Function
	}

	diagFactor = 0.707
	eventsHandler = {
		emitUL: () => {
			this.lastPressed = 'ul';
			this.delegates.emit('navigate', { x: -this.diagFactor, y: -this.diagFactor })
		},
		emitU: () => {
			this.lastPressed = 'u';
			this.delegates.emit('navigate', { x: 0, y: -1 })
		},
		emitUR: () => {
			this.lastPressed = 'ur';
			this.delegates.emit('navigate', { x: this.diagFactor, y: -this.diagFactor })
		},
		emitL: () => {
			this.lastPressed = 'l';
			this.delegates.emit('navigate', { x: -1, y: 0 })
		},
		emitC: () => {
			this.lastPressed = 'c';
			this.delegates.emit('navigate', { x: 0, y: 0 })
		},
		emitR: () => {
			this.lastPressed = 'r';
			this.delegates.emit('navigate', { x: 1, y: 0 })
		},
		emitDL: () => {
			this.lastPressed = 'dl';
			this.delegates.emit('navigate', { x: -this.diagFactor, y: this.diagFactor })
		},
		emitD: () => {
			this.lastPressed = 'd';
			this.delegates.emit('navigate', { x: 0, y: 1 })
		},
		emitDR: () => {
			this.lastPressed = 'dr';
			this.delegates.emit('navigate', { x: this.diagFactor, y: this.diagFactor })
		},
	}
}
