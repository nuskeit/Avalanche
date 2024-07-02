import { RootDiagram_DTO } from "../../../root-diagram/data";
import { Diagram } from "../../../diagram/application";
import { Diagram_DTO } from "../../../diagram/data";
import { Element_DTO } from "../../../element/data";
import { I_Element, I_ElementsStore } from "../../../element/domain";
import { EventField, MethodField, Parameter, PropertyField } from "../../../field/application";
import { Field_DTO, Parameter_DTO } from "../../../field/data";
import { I_Field } from "../../../field/domain";
import { TypeDef } from "../../../type-def/application";
import { TypeDef_DTO } from "../../../type-def/data";
import { I_TypeDef } from "../../../type-def/domain";
import { I_RootDiagram } from "../../../root-diagram/domain";
import { Zoom_DTO } from "../../../general/data/zoom_DTO";
import { defaultValue, FieldType, isUndefOrNull, undefOrNullDefault } from "../../../general/domain";
import { Zoom } from "../../../general/presenter";
import { I_RelationshipsStore } from "../../../relationships/domain";
import { AppFactory } from "../../app-factory/application";

export class Reviver {


	createRootDiagram(rootDiagDto: RootDiagram_DTO): I_RootDiagram {
		const config = AppFactory.getSingleton().createAppConfigAmbient().getApiConfig()
		const httpInPort = AppFactory.getSingleton().createHttpInPort(config)
		const repo = AppFactory.getSingleton().createRootDiagramRepo(httpInPort)

		const rootDiagram = AppFactory.getSingleton().createRootDiagram(repo, rootDiagDto.key)
		rootDiagram.name = rootDiagDto.name

		// fisrt add all elements to store
		for (const elementDto of rootDiagDto.elementsStore) {
			const elem = this.createEntity(elementDto, rootDiagram.elementsStore, rootDiagram.relationshipsStore)
			elem.name = elementDto.name
			rootDiagram.elementsStore.addElement(elementDto.key, elem);
		}
		// after adding all elements to store, add fields to the elements
		for (const elementDto of rootDiagDto.elementsStore) {
			for (const f of elementDto.fields) {
				rootDiagram.elementsStore.elements[elementDto.key].addField(this.createField(rootDiagram.elementsStore, f))
			}
		}

		// Relationships store
		for (let rel of rootDiagDto.relationshipsStore) {
			rootDiagram.relationshipsStore.addRelationship(AppFactory.getSingleton().createElementsRelationship(
				rel.sourceKey,
				rel.targetKey,
				rel.sourceElementKey,
				rel.targetElementKey,
				rel.tag,
				rel.relationshipType,
				rel.sourceMultiplicity,
				rel.targetMultiplicity,
				rel.key
			));
		}

		// Diagrams
		for (const diagDto of rootDiagDto.diagrams as Diagram_DTO[]) {
			const newDiagram = AppFactory.getSingleton().createDiagram(diagDto.name, diagDto.diagramType, diagDto.viewBox,
				diagDto.viewPort, this.createZoom(diagDto.zoom), diagDto.key)
			for (const elemDto of diagDto.elements) {
				const el = rootDiagram.elementsStore.elements[elemDto.element]
				newDiagram.addElement(rootDiagram.elementsStore.elements[el.key],
					elemDto.location.x, elemDto.location.y, elemDto.size)
			}

			// rootDiagram.relationshipsStore.relationships.forEach(r => {
			// 	newDiagram.relationships.push(r)
			// })

			// newDiagram.detectRelationshipsChanges()
			// newDiagram.relationships.forEach(r => {
			// 	rootDiagram.relationshipsStore.addRelationship(r)
			// })

			// // Relationships store
			// for (let rel of diagDto.relationships) {
			// 	newDiagram.relationships.push(AppFactory.getSingleton().createElementsRelationship(
			// 		rel.sourceKey,
			// 		rel.targetKey,
			// 		rel.sourceElementKey,
			// 		rel.targetElementKey,
			// 		rel.tag,
			// 		rel.relationshipType,
			// 		rel.sourceMultiplicity,
			// 		rel.targetMultiplicity,
			// 		rel.key
			// 	));
			// }


			rootDiagram.addDiagram(newDiagram)
		}

		return rootDiagram
	}

	createZoom(zoom: Zoom_DTO) {
		return new Zoom(zoom.factor, zoom.minFactor, zoom.maxFactor)
	}

	createField(elementsStore: I_ElementsStore, fieldDTO: Field_DTO): I_Field {
		let f: I_Field
		switch (fieldDTO.fieldType) {
			case FieldType.Method:
				f = new MethodField(
					fieldDTO.name,
					fieldDTO.description,
					fieldDTO.scope,
					this.createTypeDef(elementsStore, fieldDTO.dataTypeDef),
					// @ts-ignore  fieldDTO?.parameters is not undefined
					fieldDTO?.parameters?.map(param => this.createParameter(elementsStore, param)),
					fieldDTO.key)
				break;

			case FieldType.Event:
				f = new EventField(
					fieldDTO.name,
					fieldDTO.description,
					fieldDTO.scope,
					this.createTypeDef(elementsStore, fieldDTO.dataTypeDef),
					// @ts-ignore  fieldDTO?.parameters is not undefined
					fieldDTO?.parameters?.map(param => this.createParameter(elementsStore, param)),
					fieldDTO.key)
				break;

			default:
				f = new PropertyField(
					fieldDTO.name,
					fieldDTO.description,
					fieldDTO.scope,
					this.createTypeDef(elementsStore, fieldDTO?.dataTypeDef),
					fieldDTO.key)

				break;
		}
		return f

	}


	createTypeDef(elementsStore: I_ElementsStore, typeDefDto: TypeDef_DTO): I_TypeDef {
		const key = undefOrNullDefault<string>(typeDefDto.refElementKey, "")
		if (key == "")
			return new TypeDef(typeDefDto.fallbackDataType, null, typeDefDto.key)
		return new TypeDef(typeDefDto.fallbackDataType, elementsStore.elements[key], typeDefDto.key)
	}

	createParameter(elementsStore: I_ElementsStore, param: Parameter_DTO): Parameter {
		return new Parameter(param.key, param.name, param.direction, param.category, this.createTypeDef(elementsStore, param.dataTypeDef))
	}

	createEntity(elementDto: Element_DTO, elemStore: I_ElementsStore, relStore: I_RelationshipsStore): I_Element {
		return AppFactory.getSingleton().createElement(elementDto.elementType, elemStore, relStore, elementDto.key)
	}

}

