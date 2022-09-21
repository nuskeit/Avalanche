import { I_Parameter } from "../../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { I_Presenter } from "../../../../../core/general/presenter";

export class ParameterEditorPresenter implements I_Presenter<I_Parameter[]> {

	parameter: I_Parameter

	constructor(proxies: Proxies, parameter: I_Parameter) {
		this.proxies = proxies
		this.parameter = parameter
	}

	proxies: Proxies
	get presenterProxy() { return this.proxies.presenterProxy() }


	delegates: {} | undefined
	eventsHandler = {
	}
}

type Proxies = {
	presenterProxy(): ParameterEditorPresenter
}