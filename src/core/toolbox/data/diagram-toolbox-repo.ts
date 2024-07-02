import { I_Element } from "../../element/domain"
import { DiagramType, ElementType, HashTable } from "../../general/domain"

export interface I_MenuItemsRelationship {
	diagramType: DiagramType
	elementTypesAllowed: ElementType[]
}

export class DiagramToolboxRepo {
	itemsRelations: I_MenuItemsRelationship[] = [
		{
			diagramType: DiagramType.Class,
			elementTypesAllowed: [ElementType.Generic, ElementType.Interface, ElementType.Class, ElementType.Enum]
		},
		{
			diagramType: DiagramType.Component,
			elementTypesAllowed: [ElementType.Generic, ElementType.Interface, ElementType.Class, ElementType.Component, ElementType.Enum]
		},
		{
			diagramType: DiagramType.Generic,
			elementTypesAllowed: [ElementType.Generic]
		}
	]

	getNewElementsByDiagramType(dt: DiagramType): ElementType[] {
		const result = this.itemsRelations.find(e => e.diagramType == dt)
		if (result != undefined)
			return result.elementTypesAllowed
		return []
	}

	getExistingElementsByDiagramType(dt: DiagramType, elements: HashTable<I_Element>): I_Element[] {
		const itemsRel = this.itemsRelations.find(e => e.diagramType == dt)
		if (itemsRel == undefined) return []
		const resultKeys = Object.keys(elements).filter(e => itemsRel?.elementTypesAllowed.indexOf(elements[e].elementType) > 0)
		const result = resultKeys.map(e => elements[e])

		if (result != undefined)
			return result
		return []
	}

	// private a(itemsRelations: I_MenuItemsRelationship[], dt: DiagramType) {
	// 	return itemsRelations.filter(e => e.diagramType == dt)
	// }

}