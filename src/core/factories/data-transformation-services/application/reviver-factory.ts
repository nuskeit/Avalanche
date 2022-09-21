import { RootDiagram } from "../../../avalanche-app/root-diagram/application";
import { RootDiagram_DTO } from "../../../avalanche-app/root-diagram/data";
import { Diagram } from "../../../avalanche-app/root-diagram/diagram/application";
import { Diagram_DTO } from "../../../avalanche-app/root-diagram/diagram/data";
import { ElementsStore, Element_DTO } from "../../../avalanche-app/root-diagram/diagram/element/data";
import { I_Element, I_ElementsStore } from "../../../avalanche-app/root-diagram/diagram/element/domain";
import { MethodField, Parameter, PropertyField } from "../../../avalanche-app/root-diagram/diagram/element/field/application";
import { Field_DTO, Parameter_DTO } from "../../../avalanche-app/root-diagram/diagram/element/field/data";
import { I_Field } from "../../../avalanche-app/root-diagram/diagram/element/field/domain";
import { TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/application";
import { TypeDef_DTO } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/data";
import { I_TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/domain";
import { I_RootDiagram } from "../../../avalanche-app/root-diagram/domain";
import { FieldType, isUndefOrNull } from "../../../general/domain";
import { ElementsRelationship } from "../../../relationships/application";
import { I_RelationshipsStore } from "../../../relationships/domain";
import { AppFactory } from "../../app-factory/application";

export class Reviver {


	createRootDiagram(rootDiagDto: RootDiagram_DTO): I_RootDiagram {

		const rootDiagram = new RootDiagram()
		rootDiagram.name = rootDiagDto.name
		for (const elementDto of rootDiagDto.elementsStore) {
			const elem = this.createEntity(elementDto, rootDiagram.elementsStore, rootDiagram.relationshipsStore)
			elem.name = elementDto.name
			for (const f of elementDto.fields) {
				elem.addField(this.createField(rootDiagram.elementsStore, f))

			}
			rootDiagram.elementsStore.addElement(elementDto.key, elem);
		}

		// Relationships store
		for (let rel of rootDiagDto.relationshipsStore) {
			rootDiagram.relationshipsStore.addRelationship(new ElementsRelationship(
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
			const newDiagram = new Diagram(diag.name, diag.diagramType, diag.viewBox, diag.viewPort)
			for (const elem of diag.elements) {
				newDiagram.addElement(rootDiagram.elementsStore.elements[elem.element], elem.location.x, elem.location.y)
			}
			newDiagram.detectRelationshipsChanges()
			rootDiagram.addDiagram(newDiagram)
		}

		return rootDiagram
	}

	createField(elementsStore: ElementsStore, fieldDTO: Field_DTO): I_Field {

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


	createTypeDef(elementsStore: ElementsStore, typeDefDto: TypeDef_DTO): I_TypeDef {
		if (isUndefOrNull(typeDefDto.refElementKey))
			return new TypeDef(typeDefDto.fallbackDataType, null, typeDefDto.key)
		// @ts-ignore  typeDefDto.refElementKey is not undefined
		return new TypeDef(typeDefDto.fallbackDataType, elementsStore.elements[typeDefDto.refElementKey], typeDefDto.key)
	}

	createParameter(elementsStore: ElementsStore, param: Parameter_DTO): Parameter {
		return new Parameter(param.key, param.name, param.direction, param.category, this.createTypeDef(elementsStore, param.dataTypeDef))
	}

	createEntity(elementDto: Element_DTO, elemStore: I_ElementsStore, relStore: I_RelationshipsStore): I_Element {
		return AppFactory.getSingleton().createElement(elementDto.elementType, elemStore, relStore, elementDto.key)
	}

}

