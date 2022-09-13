import { I_Element } from "../../../core/avalanche-app/root-diagram/diagram/element/domain";
import { EventField, MethodField, PropertyField } from "../../../core/avalanche-app/root-diagram/diagram/element/field/application";
import { I_Field } from "../../../core/avalanche-app/root-diagram/diagram/element/Field/domain";
import { TypeDef } from "../../../core/avalanche-app/root-diagram/diagram/element/field/type-def/application";
import { GeneralFactory } from "../../../core/factories/application";
import { DataType, FieldType } from "../../../core/general/domain";
import { I_Presenter } from "../../../core/general/presenter";

export class ElementEditorPresenter implements I_Presenter<I_Element> {
	generalFactory: GeneralFactory

	constructor(proxies: Proxies, generalFactory: GeneralFactory) {
		this.proxies = proxies
		this.generalFactory = generalFactory
		this.resetNewFields()
	}

	resetNewFields() {
		this.newPropertyField = this.generalFactory.createField("", FieldType.Property, new TypeDef(undefined, DataType.string, null), null, undefined)
		this.newMethodField = this.generalFactory.createField("", FieldType.Method, new TypeDef(undefined, DataType.string, null), null, undefined)
		this.newEventField = this.generalFactory.createField("", FieldType.Event, new TypeDef(undefined, DataType.string, null), null, undefined)

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
			this.newPropertyField = this.generalFactory.createField("", FieldType.Property, new TypeDef(undefined, DataType.string, null), null, undefined)
		},

		handleAddNewMethodField: async () => {
			if (this.newMethodField.name.trim() == "") return
			console.log('handleAddNewProperyField');
			this.elementProxy.addField(this.newMethodField)
			this.newMethodField = this.generalFactory.createField("", FieldType.Method, new TypeDef(undefined, DataType.string, null), null, undefined)
		},

		handleAddNewEventField: async () => {
			if (this.newEventField.name.trim() == "") return
			console.log('handleAddNewProperyField');
			this.elementProxy.addField(this.newEventField)
			this.newEventField = this.generalFactory.createField("", FieldType.Event, new TypeDef(undefined, DataType.string, null), null, undefined)
		}

	}
}


type Proxies =
	{
		elementProxy(): I_Element
	}