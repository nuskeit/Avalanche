import { I_Diagram } from "../../../core/avalanche-app/root-diagram/diagram/domain";
import { Nullable } from "../../../core/general/domain";
import { I_Presenter } from "../../../core/general/presenter";

export class ElementEditorPresenter implements I_Presenter<I_Diagram> {

	constructor(proxies: Proxies) {
		this.proxies = proxies
		this.selectedDiagram = null
	}

	selectedDiagram: Nullable<I_Diagram>

	proxies: Proxies
	get diagramProxy(): I_Diagram { return this.proxies.diagramProxy() }
	get presenterProxy(): ElementEditorPresenter { return this.proxies.presenterProxy() }

	delegates: {} | undefined

	eventsHandler = {}
}

type Proxies = {
	presenterProxy(): ElementEditorPresenter
	diagramProxy(): I_Diagram
}