import { BlockEntity, ComponentEntity, EnumEntity, ExternalDependencyEntity, GenericEntity, InterfaceEntity } from "../../avalanche-app/root-diagram/diagram/element/application"
import { I_Element } from "../../avalanche-app/root-diagram/diagram/element/domain"
import * as fieldNS from "../../avalanche-app/root-diagram/diagram/element/field"
import * as typeDefNS from "../../avalanche-app/root-diagram/diagram/element/field/type-def"
import { TypeDef } from "../../avalanche-app/root-diagram/diagram/element/Field/type-def/application"
import * as generalFactoryNS from "../../factories"
import * as g from "../../general"
import { I_RelationshipsStore } from "../../relationships/domain"

export class GeneralFactory implements generalFactoryNS.domain.I_GeneralFactory {

	relationshipsStore: I_RelationshipsStore

	constructor(relationshipsStore: I_RelationshipsStore) {
		this.relationshipsStore = relationshipsStore
	}

	createElement(elementType: g.domain.ElementType, key?: string): I_Element {
		if (elementType == g.domain.ElementType.GenericEntity)
			return new GenericEntity(this.relationshipsStore, key)
		else if (elementType == g.domain.ElementType.Component)
			return new ComponentEntity(this.relationshipsStore, key)
		else if (elementType == g.domain.ElementType.Interface)
			return new InterfaceEntity(this.relationshipsStore, key)
		else if (elementType == g.domain.ElementType.Enum)
			return new EnumEntity(this.relationshipsStore, key)
		else if (elementType == g.domain.ElementType.ExternalDependency)
			return new ExternalDependencyEntity(this.relationshipsStore, key)
		return new BlockEntity(this.relationshipsStore, key)
	}

	// static createField_REVISE(elementsStore: ElementsStore, name: string, fieldType: g.domain.FieldType, fallbackDataType: g.domain.DataType, refElementKey:g.domain.Nullable<string>, parameters: g.domain.Nullable<fieldNS.domain.I_Parameter[]>, key?: string): fieldNS.domain.I_Field {
	//     let f: fieldNS.domain.I_Field
	//     switch (fieldType) {
	//         case g.domain.FieldType.Method:
	//             f = new MethodField(
	//                 name,
	//                 this.createTypeDef(elementsStore, fallbackDataType, refElementKey),
	//                 parameters, key)
	//             break;

	//         default:

	//             f = new PropertyField(
	//                 name,
	//                 this.createTypeDef(elementsStore, fallbackDataType, refElementKey),
	//                 key)

	//             break;
	//     }
	//     return f

	// }

	createField(name: string, fieldType: g.domain.FieldType, dataTypeDef: typeDefNS.domain.I_TypeDef,
		parameters: g.domain.Nullable<fieldNS.domain.I_Parameter[]>, key?: string): fieldNS.domain.I_Field {
		let f: fieldNS.domain.I_Field
		switch (fieldType) {
			case g.domain.FieldType.Method:
				f = new fieldNS.application.MethodField(
					name,
					dataTypeDef,
					parameters, key)
				break;

			case g.domain.FieldType.Event:
				f = new fieldNS.application.EventField(
					name,
					dataTypeDef,
					parameters, key)
				break;

			default:

				f = new fieldNS.application.PropertyField(
					name,
					dataTypeDef,
					key)

				break;
		}
		return f

	}

	createTypeDef(fallbackDataType: g.domain.DataType, refElement: g.domain.Nullable<I_Element>): g.domain.Nullable<typeDefNS.domain.I_TypeDef> {
		return new TypeDef(undefined, fallbackDataType, g.domain.undefinedToNull(refElement))
	}

}

