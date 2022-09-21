export class Throttle {

	lastFunc: any = 0
	lastRan: number = 0

	throttle(func: Function, limit: number) {
		if (!this.lastRan) {
			func()
			this.lastRan = Date.now()
		} else {
			clearTimeout(this.lastFunc)
			this.lastFunc = setTimeout(() => {
				if ((Date.now() - this.lastRan) >= limit) {
					func()
					this.lastRan = Date.now()
				}
			}, limit - (Date.now() - this.lastRan))
		}
	}
}
