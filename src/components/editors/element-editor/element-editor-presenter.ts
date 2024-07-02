import { I_Element } from "../../../core/element/domain";
import { I_Field } from "../../../core/field/domain";
import { AppFactory } from "../../../core/factories/app-factory/application";
import { DataType, FieldType, Nullable, Scope } from "../../../core/general/domain";
import { I_Presenter } from "../../../core/general/presenter";

export class ElementEditorPresenter implements I_Presenter<I_Element> {

	constructor(proxies: Proxies) {
		this.proxies = proxies
		this.selectedField = null
	}


	selectedField: Nullable<I_Field>


	get listProperties(): I_Field[] {
		return this.elementProxy.fields.filter(f => f.fieldType == FieldType.Property)
	}
	get listMethods(): I_Field[] {
		return this.elementProxy.fields.filter(f => f.fieldType == FieldType.Method)
	}
	get listEvents(): I_Field[] {
		return this.elementProxy.fields.filter(f => f.fieldType == FieldType.Event)
	}

	findDuplicate(name: string) {
		return (name.trim() == "" || this.elementProxy.fields.filter(f => f.name == name).length > 0)
	}

	proxies: Proxies
	get elementProxy(): I_Element { return this.proxies.elementProxy() }
	get presenterProxy(): ElementEditorPresenter { return this.proxies.presenterProxy() }


	delegates: {} | undefined
	eventsHandler = {
		selectField: (f: I_Field) => {
			this.presenterProxy.selectedField = f
		},

		handleAddNewProperyField: async () => {
			this.selectedField = AppFactory.getSingleton().createField("[new]", "", Scope.Public, FieldType.Property, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
			this.elementProxy.addField(this.selectedField)
		},

		handleAddNewMethodField: async () => {
			this.selectedField = AppFactory.getSingleton().createField("[new]", "", Scope.Public, FieldType.Method, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
			this.elementProxy.addField(this.selectedField)
		},

		handleAddNewEventField: async () => {
			this.selectedField = AppFactory.getSingleton().createField("[new]", "", Scope.Public, FieldType.Event, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
			this.elementProxy.addField(this.selectedField)
		},

		handleDeleteField: async (f: I_Field) => {
			this.presenterProxy.selectedField = null
			this.elementProxy.removeField(f)
		}

	}
}


type Proxies =
	{
		presenterProxy(): ElementEditorPresenter
		elementProxy(): I_Element
	}