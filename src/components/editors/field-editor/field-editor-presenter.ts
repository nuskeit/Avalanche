import { I_Field } from "../../../core/field/domain";
import { I_Presenter } from "../../../core/general/presenter";

export class FieldEditorPresenter implements I_Presenter<I_Field> {


	constructor(proxies: Proxies) {
		this.proxies = proxies
	}

	proxies: Proxies
	get presenterProxy(): FieldEditorPresenter { return this.proxies.presenterProxy() }
	get fieldProxy(): I_Field { return this.proxies.fieldProxy() }

	delegates: {} | undefined

	eventsHandler = {
	}
}

type Proxies = {
	presenterProxy(): FieldEditorPresenter
	fieldProxy(): I_Field
}