import { I_Field } from "../../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { I_Presenter } from "../../../../core/general/presenter";

export class FieldEditorPresenter implements I_Presenter<I_Field> {
	proxy: Function
	field: I_Field

	expand: boolean

	constructor(proxy: Function, field: I_Field) {
		this.proxy = proxy
		this.field = field
		this.expand = false
	}

	delegates: {} = {}
	eventsHandler = {
		toggleExpand: () => {
			this.proxy().expand = !this.expand
		}
	}
}
