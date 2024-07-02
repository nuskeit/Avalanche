import { I_Diagram } from "../core/diagram/domain";
import { I_RootDiagram } from "../core/root-diagram/domain";
import { AppFactory } from "../core/factories/app-factory/application";
import { DiagramType, Nullable } from "../core/general/domain";
import { I_Presenter, Zoom } from "../core/general/presenter";

export class RootDiagramPresenter implements I_Presenter<I_RootDiagram>{

	selectedDiagramIndex: number

	constructor(proxies: Proxies) {
		this.proxies = proxies
		if (this.rootDiagramProxy.diagrams.length > 0)
			this.selectedDiagramIndex = 0
		else
			this.selectedDiagramIndex = -1
	}

	selectElement(key: string, altKey: boolean) {
		if ((key >= "1" && key <= this.rootDiagramProxy.diagrams.length.toString()) && altKey)
			this.presenterProxy.selectedDiagramIndex = Number(key) - 1
	}

	get selectedDiagram(): Nullable<I_Diagram> {
		if (this.presenterProxy.selectedDiagramIndex < 0)
			return null
		return this.rootDiagramProxy.diagrams[this.presenterProxy.selectedDiagramIndex]
	}

	proxies: Proxies
	get presenterProxy(): RootDiagramPresenter { return this.proxies.presenterProxy() }
	get rootDiagramProxy(): I_RootDiagram { return this.proxies.rootDiagramProxy() }

	delegates: {} | undefined // Placeholder for delegates

	eventsHandler = {

		handleKeyDown: (e: KeyboardEvent) => {
			this.selectElement(e.key, e.altKey)
		},

		handleSaveRootDiagram: () => {
			this.rootDiagramProxy.save()
		},

		handleAddNewDiagram: (name: string, diagramType: DiagramType) => {
			const viewBox = { x: -640, y: -360, width: 1280, height: 720 }
			this.rootDiagramProxy.addDiagram(AppFactory.getSingleton().createDiagram(name, diagramType, viewBox, { x: 0, y: 0, width: 0, height: 0 }, new Zoom()))
		},

		handleDeleteDiagram: (diagramKey: string) => {
			const index = this.rootDiagramProxy.diagrams.findIndex(x => x.key == diagramKey)
			const len = this.rootDiagramProxy.diagrams.length

			this.presenterProxy.selectedDiagramIndex = index - 1

			this.rootDiagramProxy.deleteDiagram(diagramKey)
			if (index < len - 1)
				setTimeout(() => {
					this.presenterProxy.selectedDiagramIndex = index
				}, 0)
		}
	}
}

type Proxies = {
	presenterProxy(): RootDiagramPresenter
	rootDiagramProxy(): I_RootDiagram
}

