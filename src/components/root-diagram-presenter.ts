import { I_RootDiagram } from "../core/avalanche-app/root-diagram/domain";
import { I_Presenter } from "../core/general/presenter";

export class RootDiagramPresenter implements I_Presenter<I_RootDiagram>{

	selectedDiagramIndex: number

	constructor(proxies: Proxies) {
		this.proxies = proxies
		this.selectedDiagramIndex = 0
	}

	selectElement(key: string, altKey: boolean) {
		if ((key >= "1" && key <= this.rootDiagramProxy.diagrams.length.toString()) && altKey)
			this.presenterProxy.selectedDiagramIndex = Number(key) - 1
	}

	proxies: Proxies
	get presenterProxy(): RootDiagramPresenter { return this.proxies.presenterProxy() }
	get rootDiagramProxy(): I_RootDiagram { return this.proxies.rootDiagramProxy() }

	delegates: {} | undefined // Placeholder for delegates

	eventsHandler = {
		handleKeyDown: (e: KeyboardEvent) => {
			this.selectElement(e.key, e.altKey)
		}
	}
}

type Proxies = {
	presenterProxy(): RootDiagramPresenter
	rootDiagramProxy(): I_RootDiagram
}

