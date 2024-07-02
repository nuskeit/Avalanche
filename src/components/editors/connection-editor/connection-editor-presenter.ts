import { AppFactory } from "../../../core/factories/app-factory/application";
import { I_Field } from "../../../core/field/domain";
import { DataType, FieldType, Nullable, Scope } from "../../../core/general/domain";
import { I_Presenter } from "../../../core/general/presenter";
import { I_ElementsRelationship } from "../../../core/relationships/domain";

export class ConnectionEditorPresenter implements I_Presenter<I_ElementsRelationship> {

	constructor(proxies: Proxies) {
		this.proxies = proxies
	}

	proxies: Proxies
	get relationshipProxy(): I_ElementsRelationship { return this.proxies.relationshipProxy() }
	get presenterProxy(): ConnectionEditorPresenter { return this.proxies.presenterProxy() }


	delegates: {} | undefined
	eventsHandler = {
	}
}


type Proxies =
	{
		presenterProxy(): ConnectionEditorPresenter
		relationshipProxy(): I_ElementsRelationship
	}