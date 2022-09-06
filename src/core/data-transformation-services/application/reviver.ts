import { RootDiagram } from "../../avalanche-app/root-diagram/application";
import { RootDiagram_DTO } from "../../avalanche-app/root-diagram/data";
import { Diagram } from "../../avalanche-app/root-diagram/diagram/application";
import { Diagram_DTO } from "../../avalanche-app/root-diagram/diagram/data";
import { BlockEntity, ClassEntity, ComponentEntity, EnumEntity, ExternalDependencyEntity, GenericEntity, InterfaceEntity } from "../../avalanche-app/root-diagram/diagram/element/application";
import { ElementsStore, Element_DTO } from "../../avalanche-app/root-diagram/diagram/element/data";
import { I_Element } from "../../avalanche-app/root-diagram/diagram/element/domain";
import { MethodField, Parameter, PropertyField } from "../../avalanche-app/root-diagram/diagram/element/field/application";
import { Field_DTO, Parameter_DTO } from "../../avalanche-app/root-diagram/diagram/element/field/data";
import { I_Field } from "../../avalanche-app/root-diagram/diagram/element/Field/domain";
import { TypeDef } from "../../avalanche-app/root-diagram/diagram/element/Field/type-def/application";
import { TypeDef_DTO } from "../../avalanche-app/root-diagram/diagram/element/Field/type-def/data";
import { I_TypeDef } from "../../avalanche-app/root-diagram/diagram/element/Field/type-def/domain";
import { I_RootDiagram } from "../../avalanche-app/root-diagram/domain";
import { ElementType, FieldType, isUndefOrNull, Nullable } from "../../general/domain";
import { ElementsRelationship } from "../../relationships/application";

export class Reviver {

	static createRootDiagram(rootDiagDto: RootDiagram_DTO): I_RootDiagram {

		const rootDiagram = new RootDiagram()
		rootDiagram.name = rootDiagDto.name
		for (const elementDto of rootDiagDto.elementsStore) {
			const elem = this.createEntity(elementDto)
			elem.name = elementDto.name
			rootDiagram.elementsStore.addElement(elementDto.key, elem);
		}

		// Second pass to create the crossed references in TypeDefs
		for (const elementDto of rootDiagDto.elementsStore) {
			const elem = rootDiagram.elementsStore.elements[elementDto.key];
			for (const f of elementDto.fields) {
				elem.fields.push(this.createField(rootDiagram.elementsStore, f))
			}
		}


		// Relationships store
		for (let rel of rootDiagDto.relationshipsStore) {
			rootDiagram.relationshipsStore.addRelation(new ElementsRelationship(
				rel.sourceKey,
				rel.targetKey,
				rel.tag,
				rel.relationshipType,
				rel.sourceMultiplicity,
				rel.targetMultiplicity,
				rel.key
			));
		}

		// Diagrams
		for (const diag of rootDiagDto.diagrams as Diagram_DTO[]) {
			const newDiagram = new Diagram(diag.name, diag.diagramType, rootDiagram.elementsStore, rootDiagram.relationshipsStore, diag.viewBox, diag.viewPort)
			for (const elem of diag.elements) {
				newDiagram.addElement(rootDiagram.elementsStore.elements[elem.element], elem.location.x, elem.location.y)
			}
			rootDiagram.addDiagram(newDiagram)
		}
		return rootDiagram
	}


	// static createField(elementsStore: ElementsStore, name: string, fieldType: FieldType, dataTypeDef: Nullable<I_TypeDef>, parameters: Nullable<I_Parameter[]>, key: string = ""): I_Field {
	static createField(elementsStore: ElementsStore, fieldDTO: Field_DTO): I_Field {

		let f: I_Field
		switch (fieldDTO.fieldType) {
			case FieldType.Method:
				f = new MethodField(
					fieldDTO.name,
					this.createTypeDef(elementsStore, fieldDTO.dataTypeDef),
					// @ts-ignore  fieldDTO?.parameters is not undefined
					fieldDTO?.parameters?.map(param => this.createParameter(elementsStore, param)),
					fieldDTO.key)
				break;

			default:
				f = new PropertyField(
					fieldDTO.name,
					this.createTypeDef(elementsStore, fieldDTO?.dataTypeDef),
					fieldDTO.key)

				break;
		}
		return f

	}


	static createTypeDef(elementsStore: ElementsStore, typeDefDto: TypeDef_DTO): Nullable<I_TypeDef> {
		if (typeDefDto == null) return null

		if (isUndefOrNull(typeDefDto.refElementKey))
			return new TypeDef(typeDefDto.key, typeDefDto.fallbackDataType, null)
		// @ts-ignore  typeDefDto.refElementKey is not undefined
		return new TypeDef(typeDefDto.key, typeDefDto.fallbackDataType, elementsStore.elements[typeDefDto.refElementKey])
	}

	static createParameter(elementsStore: ElementsStore, param: Parameter_DTO): Parameter {
		return new Parameter(param.key, param.name, param.direction, param.category, this.createTypeDef(elementsStore, param.dataTypeDef))
	}

	static createEntity(elementDto: Element_DTO): I_Element {
		if (elementDto.elementType == ElementType.GenericEntity)
			return new GenericEntity(elementDto.key)
		if (elementDto.elementType == ElementType.Class)
			return new ClassEntity(elementDto.key)
		else if (elementDto.elementType == ElementType.Component)
			return new ComponentEntity(elementDto.key)
		else if (elementDto.elementType == ElementType.Interface)
			return new InterfaceEntity(elementDto.key)
		else if (elementDto.elementType == ElementType.Enum)
			return new EnumEntity(elementDto.key)
		else if (elementDto.elementType == ElementType.ExternalDependency)
			return new ExternalDependencyEntity(elementDto.key)
		return new BlockEntity(elementDto.key)
	}

}

