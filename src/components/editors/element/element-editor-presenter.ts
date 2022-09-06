import { I_Element } from "../../../core/avalanche-app/root-diagram/diagram/element/domain";
import { I_Presenter } from "../../../core/general/presenter";

export class ElementEditorPresenter implements I_Presenter<I_Element> {
	proxy: Function
	element: I_Element

	constructor(proxy: Function, element: I_Element) {
		this.proxy = proxy
		this.element = element
	}

	delegates: {} = {}
	eventsHandler: {} = {}
}
