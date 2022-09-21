import { I_Element } from "../../../core/avalanche-app/root-diagram/diagram/element/domain";
import { I_Field } from "../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { AppFactory } from "../../../core/factories/app-factory/application";
import { DataType, FieldType } from "../../../core/general/domain";
import { I_Presenter } from "../../../core/general/presenter";

export class ElementEditorPresenter implements I_Presenter<I_Element> {

	constructor(proxies: Proxies) {
		this.proxies = proxies
		this.resetNewFields()
	}

	resetNewFields() {
		this.newPropertyField = AppFactory.getSingleton().createField("", FieldType.Property, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
		this.newMethodField = AppFactory.getSingleton().createField("", FieldType.Method, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
		this.newEventField = AppFactory.getSingleton().createField("", FieldType.Event, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)

	}

	// @ts-ignore: Set at beginig by resetFields()
	newPropertyField: I_Field
	// @ts-ignore: Set at beginig by resetFields()
	newMethodField: I_Field
	// @ts-ignore: Set at beginig by resetFields()
	newEventField: I_Field

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


	delegates: {} | undefined
	eventsHandler = {
		handleAddNewProperyField: async () => {
			if (this.newPropertyField.name.trim() == "" || this.findDuplicate(this.newPropertyField.name)) return
			this.elementProxy.addField(this.newPropertyField)
			this.newPropertyField = AppFactory.getSingleton().createField("", FieldType.Property, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
		},

		handleAddNewMethodField: async () => {
			if (this.newMethodField.name.trim() == "") return
			console.log('handleAddNewProperyField');
			this.elementProxy.addField(this.newMethodField)
			this.newMethodField = AppFactory.getSingleton().createField("", FieldType.Method, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
		},

		handleAddNewEventField: async () => {
			if (this.newEventField.name.trim() == "") return
			console.log('handleAddNewProperyField');
			this.elementProxy.addField(this.newEventField)
			this.newEventField = AppFactory.getSingleton().createField("", FieldType.Event, AppFactory.getSingleton().createTypeDef(DataType.string, null), null, undefined)
		}

	}
}


type Proxies =
	{
		elementProxy(): I_Element
	}