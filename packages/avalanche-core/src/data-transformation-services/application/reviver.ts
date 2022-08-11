import {
	ClassEntity, Diagram, Diagram_DTO, ElementsRelationship,
	ElementsStore, FieldType, Field_DTO, isUndefOrNull,
	I_Field, I_TypeDef, MethodField, Nullable,
	PropertyField, RootDiagram, I_RootDiagram, RootDiagram_DTO,
	TypeDef, TypeDef_DTO
} from "../..";
import { I_Repository } from "../..";

export class Reviver {

	static createRootDiagram(rootDiagDto: RootDiagram_DTO, repo: I_Repository<I_RootDiagram>): RootDiagram {

		const rootDiagram = new RootDiagram(repo)
		rootDiagram.name = rootDiagDto.name
		for (const elementDto of rootDiagDto.elementsStore) {
			const elem = new ClassEntity(elementDto.key)
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


		// Relations store
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
			const newDiagram = new Diagram(diag.name, diag.diagramType, rootDiagram.elementsStore, rootDiagram.relationshipsStore)
			for (const elem of diag.elements) {
				newDiagram.addElement(rootDiagram.elementsStore.elements[elem.element], elem.location.x, elem.location.y)
			}
			rootDiagram.addDiagram(newDiagram)
		}
console.log('rootDiagram',rootDiagram);
		return rootDiagram
	}


	// static createField(elementsStore: ElementsStore, name: string, fieldType: FieldType, dataTypeDef: Nullable<I_TypeDef>, parameters: Nullable<I_Parameter[]>, key: string = ""): I_Field {
	static createField(elementsStore: ElementsStore, fieldDTO: Field_DTO): I_Field {
		let f: I_Field
		switch (fieldDTO.fieldType) {
			case FieldType.Method:
				f = new MethodField(
					fieldDTO.name,
					this.createTypeDef(elementsStore, fieldDTO?.dataTypeDef),
					// @ts-ignore  fieldDTO?.parameters is not undefined
					fieldDTO?.parameters, fieldDTO.key)
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


	static createTypeDef(elementsStore: ElementsStore, typeDef: Nullable<TypeDef_DTO>): Nullable<I_TypeDef> {
		if (typeDef == null) return null
		if (isUndefOrNull(typeDef.refElementKey))
			return new TypeDef(typeDef.fallbackDataType, null)
		// @ts-ignore  typeDef.refElementKey is not undefined
		return new TypeDef(typeDef.fallbackDataType, elementsStore.elements[typeDef.refElementKey])
	}

}

