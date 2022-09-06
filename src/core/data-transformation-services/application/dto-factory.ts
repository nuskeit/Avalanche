import * as diagramNS from "../../avalanche-app/root-diagram/diagram";
import * as elemNS from "../../avalanche-app/root-diagram/diagram/element";
import * as fieldNS from "../../avalanche-app/root-diagram/diagram/element/field";
import * as g from "../../general";
import * as relationshipsNS from "../../relationships";
import * as rootDiagramNS from "../../avalanche-app/root-diagram"
import * as dtoNS from "../../data-transformation-services"
import * as  typeDefNS from "../../avalanche-app/root-diagram/diagram/element/field/type-def";
import * as dragNS from "../../drag";

export class DtoFactory implements dtoNS.domain.I_DtoFactory {

	createRootDiagramDto(rd: rootDiagramNS.application.RootDiagram): rootDiagramNS.data.RootDiagram_DTO {
		const r = new rootDiagramNS.data.RootDiagram_DTO(
			rd.key,
			rd.name,
			rd.diagrams.map(d => this.createDiagramDto(d)),
			g.domain.HashTabletoArray<elemNS.domain.I_Element>(rd.elementsStore.elements)
				.map(e => this.createElementDto(e)),
			rd.relationshipsStore.relationships.map<relationshipsNS.data.ElementsRelationship_DTO>(r =>
				new relationshipsNS.data.ElementsRelationship_DTO(r.sourceKey, r.targetKey, r.tag,
					r.relationshipType, r.sourceMultiplicity, r.targetMultiplicity, r.key))
		)
		return r
	}

	// createDiagramDto(d: I_Diagram): Diagram_DTO {
	// 	return new Diagram_DTO(d.key, d.name, d.diagramType, d.visible,
	// 		HashTabletoArray<I_Draggable<I_Element>>(d.elements)
	// 			.map(e => new Draggable_DTO<string>(e.element.key, { x: e.dragger.location.x, y: e.dragger.location.y })))
	// }

	createDiagramDto(d: diagramNS.application.Diagram): diagramNS.data.Diagram_DTO {
		const elementsArray = g.domain.HashTabletoArray<dragNS.domain.I_Draggable<elemNS.domain.I_Element>>(d.elements)
		const elements = elementsArray.map(e => {
			return {
				element: e.element.key,
				//width: e.width,
				location: new g.domain.Vector(e.dragger.location.x, e.dragger.location.y)
			}
		})

		return new diagramNS.data.Diagram_DTO(d.key, d.name, d.diagramType, d.visible, elements, d.viewBox, d.viewPort)
	}

	createElementDto(e: elemNS.domain.I_Element) {
		return new elemNS.data.Element_DTO(e.key, e.name, e.visible, e.elementType, e.fields.map(f => this.createFieldDto(f)))
	}

	createFieldDto(field: fieldNS.domain.I_Field): fieldNS.data.Field_DTO {
		if (field.fieldType == g.domain.FieldType.Method) {
			return new fieldNS.data.MethodField_DTO(field.key,
				field.name, field.text, field.fieldType,
				// @ts-ignore
				undefinedToNull(field.dataTypeDef) == null ? null : this.createTypeDefDto(field.dataTypeDef),
				(field as fieldNS.application.MethodField).parameters
					.map(p => this.creatParameterDto(p)))
		} else
			return new fieldNS.data.PropertyField_DTO(field.key, field.name, field.text, field.fieldType,
				// @ts-ignore
				undefinedToNull(field.dataTypeDef) == null ? null : this.createTypeDefDto(field.dataTypeDef))
	}

	creatParameterDto(p: fieldNS.domain.I_Parameter): fieldNS.data.Parameter_DTO {
		// @ts-ignore
		return new Parameter_DTO(p.name, p.direction, p.category, undefinedToNull(p.dataTypeDef) == null ? null : this.createTypeDefDto(p.dataTypeDef))
	}

	createTypeDefDto(t: typeDefNS.domain.I_TypeDef): typeDefNS.data.TypeDef_DTO {
		// @ts-ignore
		return new TypeDef_DTO(t.name, t.fallbackDataType, undefinedToNull(t.refElement) == null ? null : t.refElement.key)
	}

}