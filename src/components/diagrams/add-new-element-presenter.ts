import { AvalancheApp } from "../../core/avalanche-app/application";
import { I_Diagram } from "../../core/diagram/domain";
import { I_Element } from "../../core/element/domain";
import { AppFactory } from "../../core/factories/app-factory/application";
import { ElementType } from "../../core/general/domain";
import { I_Presenter } from "../../core/general/presenter";

export class AddNewElementPresenter implements I_Presenter<{}>{

	avalancheApp: AvalancheApp

	constructor(proxies: Proxies, avalancheApp: AvalancheApp) {
		this.proxies = proxies
		this.avalancheApp = avalancheApp
	}

	addComponent(el: I_Element): void {
		el.name = `${el.elementType} ${el.key}`
		el.visible = true
		this.diagramProxy.addElement(el)
	}

	addComponentHandler() {
		const pe: I_Element = AppFactory.getSingleton().createElement(ElementType.Component,
			this.avalancheApp.rootDiagram.elementsStore, this.avalancheApp.rootDiagram.relationshipsStore, undefined)
		this.addComponent(pe)
	}

	addGenericHandler() {
		const pe: I_Element = AppFactory.getSingleton().createElement(ElementType.Generic,
			this.avalancheApp.rootDiagram.elementsStore, this.avalancheApp.rootDiagram.relationshipsStore, undefined)
		this.addComponent(pe)
	}

	addClassHandler() {
		const pe: I_Element = AppFactory.getSingleton().createElement(ElementType.Class,
			this.avalancheApp.rootDiagram.elementsStore, this.avalancheApp.rootDiagram.relationshipsStore, undefined)
		this.addComponent(pe)
	}

	addInterfaceHandler() {
		const pe: I_Element = AppFactory.getSingleton().createElement(ElementType.Interface,
			this.avalancheApp.rootDiagram.elementsStore, this.avalancheApp.rootDiagram.relationshipsStore, undefined)
		this.addComponent(pe)
	}

	addEnumHandler() {
		const pe: I_Element = AppFactory.getSingleton().createElement(ElementType.Enum,
			this.avalancheApp.rootDiagram.elementsStore, this.avalancheApp.rootDiagram.relationshipsStore, undefined)
		this.addComponent(pe)
	}

	get presenterProxy(): AddNewElementPresenter { return this.proxies.presenterProxy() }
	get diagramProxy(): I_Diagram { return this.proxies.diagramProxy() }

	proxies: Proxies;
	delegates: {} | undefined;
	eventsHandler = {
		addCommandHandler: (e: ElementType) => {
			switch (e) {
				case ElementType.Component:
					this.addComponentHandler()
					break;
				case ElementType.Generic:
					this.addGenericHandler()
					break;
				case ElementType.Class:
					this.addClassHandler()
					break;
				case ElementType.Interface:
					this.addInterfaceHandler()
					break;
				case ElementType.Enum:
					this.addEnumHandler()
					break;

				default:
					break;
			}
		}

	}
}


type Proxies = {
	diagramProxy(): I_Diagram
	presenterProxy(): AddNewElementPresenter
}