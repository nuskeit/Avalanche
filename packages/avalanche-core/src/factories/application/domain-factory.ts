// import { I_Element } from "../domain/diagram/element/element";
// import { I_Field } from "../domain/diagram/element/field/field";
// import { MethodField } from "../domain/diagram/element/field/method-field";
// import { I_Parameter } from "../domain/diagram/element/field/parameter";
// import { PropertyField } from "../domain/diagram/element/field/property-field";
// import { I_TypeDef, TypeDef } from "../domain/diagram/element/field/type-def/type-def";
// import { DataType, FieldType } from "../../domain/enumerators";
// import { Nullable, undefinedToNull } from "../../domain/generic-types";

import { DataType, FieldType, I_Element, I_Field, I_Parameter, I_TypeDef, Nullable } from "../../.."


export interface I_DomainFactory {

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

    createField(name: string, fieldType: FieldType, dataTypeDef: I_TypeDef, parameters: Nullable<I_Parameter[]>, key?: string): I_Field 

    createTypeDef(fallbackDataType: DataType, refElement: Nullable<I_Element>): Nullable<I_TypeDef>
    
}

