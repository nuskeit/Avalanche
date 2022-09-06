import { I_AvalancheApp } from "./core"

export class AppPresenter {

	avalancheApp: I_AvalancheApp
	//avalancheApp = new AvalancheApp(this.httpInPort, this.generalFactory)

	constructor(avalancheApp: I_AvalancheApp) {
		this.avalancheApp = avalancheApp
	}

} 