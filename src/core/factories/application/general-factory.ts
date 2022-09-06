import * as elementNS from "../../avalanche-app/root-diagram/diagram/element"
import * as fieldNS from "../../avalanche-app/root-diagram/diagram/element/field"
import * as typeDefNS from "../../avalanche-app/root-diagram/diagram/element/field/type-def"
import { TypeDef } from "../../avalanche-app/root-diagram/diagram/element/Field/type-def/application"
import * as generalFactoryNS from "../../factories"
import * as g from "../../general"

export class GeneralFactory implements generalFactoryNS.domain.I_GeneralFactory {

	createElement(elementType: g.domain.ElementType, key: string): elementNS.domain.I_Element {
		if (elementType == g.domain.ElementType.GenericEntity)
			return new elementNS.application.GenericEntity(key)
		else if (elementType == g.domain.ElementType.Component)
			return new elementNS.application.ComponentEntity(key)
		else if (elementType == g.domain.ElementType.Interface)
			return new elementNS.application.InterfaceEntity(key)
		else if (elementType == g.domain.ElementType.Enum)
			return new elementNS.application.EnumEntity(key)
		else if (elementType == g.domain.ElementType.ExternalDependency)
			return new elementNS.application.ExternalDependencyEntity(key)
		return new elementNS.application.BlockEntity(key)
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

			default:

				f = new fieldNS.application.PropertyField(
					name,
					dataTypeDef,
					key)

				break;
		}
		return f

	}

	createTypeDef(fallbackDataType: g.domain.DataType, refElement: g.domain.Nullable<elementNS.domain.I_Element>): g.domain.Nullable<typeDefNS.domain.I_TypeDef> {
		return new TypeDef(undefined, fallbackDataType, g.domain.undefinedToNull(refElement))
	}

}

