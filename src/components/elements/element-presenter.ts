import { I_DraggableElement } from "../../core/drag/domain/draggable-element";
import { I_Presenter } from "../../core/general/presenter";

export class ElementPresenter implements I_Presenter<I_DraggableElement>{

	constructor(proxies: Proxies) {
		this.proxies = proxies
	}

	get presenterProxy(): ElementPresenter { return this.proxies.presenterProxy() }
	get elementProxy(): I_DraggableElement { return this.proxies.elementProxy() }

	proxies: Proxies;
	delegates: {} | undefined;
	eventsHandler: {} | undefined;
}


type Proxies = {
	elementProxy(): I_DraggableElement
	presenterProxy(): ElementPresenter
}