import * as g from "../../general"

export interface I_MenuItemsRelationship {
	diagramType: g.domain.DiagramType
	elementTypesAllowed: g.domain.ElementType[]
}

export class DiagramToolbox {
	itemsRelations: I_MenuItemsRelationship[] = [
		{
			diagramType: g.domain.DiagramType.Class,
			elementTypesAllowed: [g.domain.ElementType.GenericEntity,g.domain.ElementType.Interface, g.domain.ElementType.Class, g.domain.ElementType.Enum]
		},
		{
			diagramType: g.domain.DiagramType.Component,
			elementTypesAllowed: [g.domain.ElementType.GenericEntity,g.domain.ElementType.Interface, g.domain.ElementType.Class, g.domain.ElementType.Component, g.domain.ElementType.Enum]
		},
		{
			diagramType: g.domain.DiagramType.Block,
			elementTypesAllowed: [g.domain.ElementType.Block]
		}
	]

	getMenuItemsByDiagramType(dt: g.domain.DiagramType): g.domain.ElementType[] {
		const result = this.itemsRelations.find(e => e.diagramType == dt)
		if (result != undefined)
			return result.elementTypesAllowed
		return []
	}
}