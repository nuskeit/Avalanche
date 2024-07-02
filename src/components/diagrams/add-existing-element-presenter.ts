import { AvalancheApp } from "../../core/avalanche-app/application";
import { I_Diagram } from "../../core/diagram/domain";
import { I_Element, I_ElementsStore } from "../../core/element/domain";
import { HashTable } from "../../core/general/domain";
import { I_Presenter } from "../../core/general/presenter";
import { DiagramToolboxRepo } from "../../core/toolbox/data";

export class AddExistingElementPresenter implements I_Presenter<{}>{

	avalancheApp: AvalancheApp

	constructor(proxies: Proxies, avalancheApp: AvalancheApp) {
		this.proxies = proxies
		this.avalancheApp = avalancheApp
	}

	addElement(el: I_Element): void {
		el.visible = true
		this.diagramProxy.addElement(el)
	}


	get elementsExcludingLocal(): HashTable<I_Element> {
		let result: HashTable<I_Element> = {}
		for (let e in this.elementsStoreProxy.elements) {
			if (!(e in this.diagramProxy.elements))
				result[e] = this.elementsStoreProxy.elements[e]
		}
		return result
	}

	get menuElements(): I_Element[] {
		return this.repoProxy.getExistingElementsByDiagramType(this.diagramProxy.diagramType, this.elementsExcludingLocal)
	}

	get presenterProxy(): AddExistingElementPresenter { return this.proxies.presenterProxy() }
	get diagramProxy(): I_Diagram { return this.proxies.diagramProxy() }
	get repoProxy(): DiagramToolboxRepo { return this.proxies.repoProxy() }
	get elementsStoreProxy(): I_ElementsStore { return this.proxies.elementsStoreProxy() }

	proxies: Proxies;
	delegates: {} | undefined;
	eventsHandler = {
		addCommandHandler: (e: I_Element) => {
			this.addElement(e)
		}

	}
}


type Proxies = {
	diagramProxy(): I_Diagram
	presenterProxy(): AddExistingElementPresenter
	repoProxy(): DiagramToolboxRepo
	elementsStoreProxy(): I_ElementsStore
}