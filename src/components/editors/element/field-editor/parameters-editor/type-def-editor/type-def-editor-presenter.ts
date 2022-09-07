import { I_Parameter } from "../../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { I_Presenter } from "../../../../../core/general/presenter";

export class ParametersEditorPresenter implements I_Presenter<I_Parameter[]> {
	proxy: Function
	parameters: I_Parameter[]

	expand: boolean

	constructor(proxy: Function, parameters: I_Parameter[]) {
		this.proxy = proxy
		this.parameters = parameters
		this.expand = false
	}

	delegates: {} = {}
	eventsHandler = {
	}
}
