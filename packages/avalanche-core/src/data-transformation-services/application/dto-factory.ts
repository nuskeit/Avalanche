import {
	Diagram_DTO, ElementsRelationship_DTO, Element_DTO,
	FieldType, Field_DTO, HashTabletoArray, I_Diagram, 
	I_DraggableWrapper, I_DtoFactory, I_Element, I_Field, I_Parameter,
	I_TypeDef, MethodField, MethodField_DTO, Parameter_DTO,
	PropertyField_DTO, RootDiagram, RootDiagram_DTO, TypeDef_DTO,
	undefinedToNull, Vector
} from "../..";

export class DtoFactory implements I_DtoFactory {

	createRootDiagramDto(rd: RootDiagram): RootDiagram_DTO {
		const r = new RootDiagram_DTO(
			rd.key,
			rd.name,
			rd.diagrams.map(d => this.createDiagramDto(d)),
			HashTabletoArray<I_Element>(rd.elementsStore.elements)
				.map(e => this.createElementDto(e)),
			rd.relationshipsStore.relationships.map<ElementsRelationship_DTO>(r =>
				new ElementsRelationship_DTO(r.sourceKey, r.targetKey, r.tag, r.relationshipType, r.sourceMultiplicity, r.targetMultiplicity, r.key))
		)
		return r
	}

	// createDiagramDto(d: I_Diagram): Diagram_DTO {
	// 	return new Diagram_DTO(d.key, d.name, d.diagramType, d.visible,
	// 		HashTabletoArray<I_DraggableWrapper<I_Element>>(d.elements)
	// 			.map(e => new DraggableWrapper_DTO<string>(e.element.key, { x: e.dragger.location.x, y: e.dragger.location.y })))
	// }

	createDiagramDto(d: I_Diagram): Diagram_DTO {
		const elementsArray = HashTabletoArray<I_DraggableWrapper<I_Element>>(d.elements)
		const elements = elementsArray.map(e => {
			return {
				element: e.element.key,
				location: new Vector(e.dragger.location.x, e.dragger.location.y)
			}
		})

		return new Diagram_DTO(d.key, d.name, d.diagramType, d.visible, elements)
	}

	createElementDto(e: I_Element) {
		return new Element_DTO(e.key, e.name, e.visible, e.elementType, e.fields.map(f => this.createFieldDto(f)))
	}

	createFieldDto(field: I_Field): Field_DTO {
		if (field.fieldType == FieldType.Method) {
			return new MethodField_DTO(field.key,
				field.name, field.text, field.fieldType,
				// @ts-ignore
				undefinedToNull(field.dataTypeDef) == null ? null : this.createTypeDefDto(field.dataTypeDef),
				(field as MethodField).parameters
					.map(p => this.creatParameterDto(p)))
		} else
			return new PropertyField_DTO(field.key, field.name, field.text, field.fieldType,
				// @ts-ignore
				undefinedToNull(field.dataTypeDef) == null ? null : this.createTypeDefDto(field.dataTypeDef))
	}

	creatParameterDto(p: I_Parameter): Parameter_DTO {
		// @ts-ignore
		return new Parameter_DTO(p.name, p.direction, p.category, undefinedToNull(p.dataType) == null ? null : this.createTypeDefDto(p.dataType))
	}

	createTypeDefDto(t: I_TypeDef): TypeDef_DTO {
		// @ts-ignore
		return new TypeDef_DTO(t.name, t.fallbackDataType, undefinedToNull(t.refElement) == null ? null : t.refElement.key)
	}

}