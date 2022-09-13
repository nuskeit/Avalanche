import { I_Field } from "../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { I_Presenter } from "../../../../core/general/presenter";

export class FieldEditorPresenter implements I_Presenter<I_Field> {

	expand: boolean

	constructor(proxies: Proxies) {
		this.proxies = proxies
		this.expand = false
	}

	proxies: Proxies
	get presenterProxy(): FieldEditorPresenter { return this.proxies.presenterProxy() }
	get fieldProxy(): I_Field { return this.proxies.fieldProxy() }

	delegates: {} | undefined

	eventsHandler = {
		toggleExpand: () => {
			this.presenterProxy.expand = !this.expand
		}
	}
}

type Proxies = {
	presenterProxy(): FieldEditorPresenter
	fieldProxy(): I_Field
}