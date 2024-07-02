export { }
import { I_Parameter } from "../../../core/field/domain";
import { AppFactory } from "../../../core/factories/app-factory/application";
import { DataType, ParamDirection, ParamValRef } from "../../../core/general/domain";
import { I_Presenter } from "../../../core/general/presenter";

export class ParametersEditorPresenter implements I_Presenter<I_Parameter[]> {

	parameters: I_Parameter[]
	expand: boolean = false
	// @ts-ignore, value set trough function
	newParameter: I_Parameter

	constructor(proxies: Proxies, parameters: I_Parameter[]) {
		this.proxies = proxies
		this.parameters = parameters
		this.createNewParameter()
		this.addingNew = false
	}


	addingNew: boolean

	proxies: Proxies

	get presenterProxy() { return this.proxies.presenterProxy() }

	createNewParameter() {
		this.newParameter = AppFactory.getSingleton().createParameter("new",
			ParamDirection.In, ParamValRef.Val, AppFactory.getSingleton().createTypeDef(DataType.string, null))
	}

	delegates: {} | undefined
	eventsHandler = {

		deleteParameterHandler: (index: number) => {
			this.proxies.parametersProxy().splice(index, 1)
		},
		addParameterHandler: (i: number, p: I_Parameter) => {
			this.proxies.parametersProxy().push(p)
			this.createNewParameter()
			this.proxies.presenterProxy().addingNew = false
		},
		activateNewHandler: () => {
			//emit('action:add', props.index, parameter.value)
			this.proxies.presenterProxy().addingNew = true
		}
	}
}

type Proxies = {
	presenterProxy(): ParametersEditorPresenter,
	parametersProxy(): I_Parameter[]
}