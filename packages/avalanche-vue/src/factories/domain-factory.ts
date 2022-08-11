import {
    DataType, FieldType, I_Element, I_Field,
    I_Parameter, I_TypeDef, MethodField, Nullable,
    PropertyField, TypeDef, undefinedToNull
} from "../../../avalanche-core";


export class DomainFactory {

    // static createField_REVISE(elementsStore: ElementsStore, name: string, fieldType: FieldType, fallbackDataType: DataType, refElementKey:Nullable<string>, parameters: Nullable<I_Parameter[]>, key?: string): I_Field {
    //     let f: I_Field
    //     switch (fieldType) {
    //         case FieldType.Method:
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

    static createField(name: string, fieldType: FieldType, dataTypeDef: I_TypeDef, parameters: Nullable<I_Parameter[]>, key?: string): I_Field {
        let f: I_Field
        switch (fieldType) {
            case FieldType.Method:
                f = new MethodField(
                    name,
                    dataTypeDef,
                    parameters, key)
                break;

            default:

                f = new PropertyField(
                    name,
                    dataTypeDef,
                    key)

                break;
        }
        return f

    }

    static createTypeDef(fallbackDataType: DataType, refElement: Nullable<I_Element>): Nullable<I_TypeDef> {
        return new TypeDef(fallbackDataType, undefinedToNull(refElement))
    }

}

