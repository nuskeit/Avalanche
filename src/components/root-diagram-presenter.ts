import { I_RootDiagram } from "../core/avalanche-app/root-diagram/domain";
import { I_Presenter } from "../core/general/presenter";

export class RootDiagramPresenter implements I_Presenter<I_RootDiagram>{

	rootDiagram: I_RootDiagram
	proxy: Function

	selectedDiagramIndex: number

	constructor(proxy: Function, rootDiagram: I_RootDiagram) {
		this.proxy = proxy
		this.rootDiagram = rootDiagram
		this.selectedDiagramIndex = 0
	}

	selectElement(key: string, altKey: boolean) {
		if ((key >= "1" && key <= this.rootDiagram.diagrams.length.toString()) && altKey)
			this.proxy().selectedDiagramIndex = Number(key) - 1
	}

	delegates = {}

	eventsHandler = {
		handleKeyDown: (e: KeyboardEvent) => {
			this.selectElement(e.key, e.altKey)
		}
	}
}
