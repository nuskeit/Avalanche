import { RootDiagram_DTO } from "../../../root-diagram/data";
import { Diagram_DTO } from "../../../diagram/data";
import { I_Diagram } from "../../../diagram/domain";
import { Element_DTO } from "../../../element/data";
import { I_Element } from "../../../element/domain";
import { MethodField } from "../../../field/application";
import { EventField_DTO, Field_DTO, MethodField_DTO, Parameter_DTO, PropertyField_DTO } from "../../../field/data";
import { I_Field, I_Parameter } from "../../../field/domain";
import { TypeDef_DTO } from "../../../type-def/data";
import { I_TypeDef } from "../../../type-def/domain";
import { I_RootDiagram } from "../../../root-diagram/domain";
import { DraggableElement_DTO } from "../../../drag/data/draggable-element-dto";
import { I_DraggableElement } from "../../../drag/domain/draggable-element";
import { Zoom_DTO } from "../../../general/data/zoom_DTO";
import { FieldType, HashTabletoArray, I_Zoom } from "../../../general/domain";
import { Zoom } from "../../../general/presenter";
import { ElementsRelationship_DTO } from "../../../relationships/data";
import { I_ElementsRelationship } from "../../../relationships/domain";
import { I_DtoFactory } from "../domain";

export class DtoFactory implements I_DtoFactory {

	private static singletonInstance: DtoFactory | undefined

	private constructor() { }

	static getSingleton(): DtoFactory {
		if (!this.singletonInstance)
			this.singletonInstance = new DtoFactory()

		return this.singletonInstance
	}

	createRootDiagramDto(rd: I_RootDiagram): RootDiagram_DTO {
		const r = new RootDiagram_DTO(
			rd.key,
			rd.name,
			rd.diagrams.map(d => this.createDiagramDto(d)),
			HashTabletoArray<I_Element>(rd.elementsStore.elements)
				.map(e => this.createElementDto(e)),
			rd.relationshipsStore.relationships.map<ElementsRelationship_DTO>(r =>
				this.createElementRelationshipDto(r))
		)
		return r
	}

	// createDiagramDto(d: I_Diagram): Diagram_DTO {
	// 	return new Diagram_DTO(d.key, d.name, d.diagramType, d.visible,
	// 		HashTabletoArray<I_Draggable<I_Element>>(d.elements)
	// 			.map(e => new Draggable_DTO<string>(e.element.key, { x: e.location.x, y: e.location.y })))
	// }

	createDiagramDto(d: I_Diagram): Diagram_DTO {
		const elementsArray = HashTabletoArray<I_DraggableElement>(d.elements)
		const elements = elementsArray.map(e => {
			return this.createDraggableElementDto(e)
		})
		// const relationships = d.relationships.map<ElementsRelationship_DTO>(r => {
		// 	return this.createElementRelationshipDto(r)
		// })

		const zoom = this.createZoomDto(d.zoom)
		// return new Diagram_DTO(d.key, d.name, d.diagramType, d.visible, elements, relationships, d.viewBox, d.viewPort, zoom)
		return new Diagram_DTO(d.key, d.name, d.diagramType, d.visible, elements, d.viewBox, d.viewPort, zoom)
	}

	createZoomDto(e: I_Zoom): Zoom_DTO {
		return new Zoom_DTO(e.factor, e.minFactor, e.maxFactor)
	}

	createElementRelationshipDto(r: I_ElementsRelationship): ElementsRelationship_DTO {
		return new ElementsRelationship_DTO(r.sourceKey, r.targetKey, r.sourceKey, r.targetKey, r.tag, r.relationshipType, r.sourceMultiplicity, r.targetMultiplicity, r.key)
	}

	createElementDto(e: I_Element): Element_DTO {
		return new Element_DTO(e.key, e.name, e.visible, e.elementType, e.fields.map(f => this.createFieldDto(f)))
	}

	createDraggableElementDto(e: I_DraggableElement): DraggableElement_DTO {
		return new DraggableElement_DTO(e.element.key, e.location, e.size)
	}

	createFieldDto(field: I_Field): Field_DTO {
		if (field.fieldType == FieldType.Method) {
			return new MethodField_DTO(field.key, field.name, field.description, field.scope, field.fieldType,
				// @ts-ignore
				this.createTypeDefDto(field.dataTypeDef),
				(field as MethodField).parameters
					.map(p => this.creatParameterDto(p)))
		} else if (field.fieldType == FieldType.Event) {
			return new EventField_DTO(field.key, field.name, field.description, field.scope, field.fieldType,
				// @ts-ignore
				this.createTypeDefDto(field.dataTypeDef),
				(field as MethodField).parameters
					.map(p => this.creatParameterDto(p)))
		} else {
			return new PropertyField_DTO(field.key, field.name, field.description, field.scope, field.fieldType,
				// @ts-ignore
				this.createTypeDefDto(field.dataTypeDef))
		}
	}

	creatParameterDto(p: I_Parameter): Parameter_DTO {
		return new Parameter_DTO(p.key, p.name, p.direction, p.category, this.createTypeDefDto(p.dataTypeDef))
	}

	createTypeDefDto(t: I_TypeDef): TypeDef_DTO {
		return new TypeDef_DTO(t.key, t.name, t.fallbackDataType, t.refElement == null ? null : t.refElement.key)
	}

}