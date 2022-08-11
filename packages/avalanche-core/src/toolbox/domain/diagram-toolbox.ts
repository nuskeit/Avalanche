import { DiagramType } from "../.."

export interface I_MenuItem {
    key: string
    name: string
    diagramCompatibility: Set<DiagramType>
}

export interface I_MenuItemsRelationship {
    key: string
    diagramType: DiagramType
}

export class DiagramToolbox {
    itemsRelations: I_MenuItemsRelationship[] = [
        {
            key: "keyAddInterface",
            diagramType: DiagramType.Class
        },
        {
            key: "keyAddInterface",
            diagramType: DiagramType.Component
        },
        {
            key: "keyAddClass",
            diagramType: DiagramType.Class
        },
        {
            key: "keyAddClass",
            diagramType: DiagramType.Component
        },
        {
            key: "keyAddComponent",
            diagramType: DiagramType.Component
        },
        {
            key: "keyAddBlock",
            diagramType: DiagramType.Block
        },
        {
            key: "keyAddEnum",
            diagramType: DiagramType.Class
        },
        {
            key: "keyAddEnum",
            diagramType: DiagramType.Component
        },
    ]

    public checkElementDiagramCompatibility(key: string, diagramType: DiagramType): boolean {
        const el: I_MenuItemsRelationship | undefined = this.itemsRelations.find(e => e.key === key && e.diagramType === diagramType)
        return (el != undefined)
    }
}