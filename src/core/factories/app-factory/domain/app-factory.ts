import { I_AppConfig, I_AppConfigAmbient, I_AvalancheApp } from "../../../avalanche-app/domain";
import { I_Diagram } from "../../../diagram/domain";
import { I_Element, I_ElementsStore } from "../../../element/domain";
import { I_Field, I_Parameter } from "../../../field/domain";
import { I_TypeDef } from "../../../type-def/domain";
import { I_RootDiagram } from "../../../root-diagram/domain";
import { I_RootDiagramRepo } from "../../../root-diagram/domain/root-domain-repo";
import { I_Draggable } from "../../../drag/domain";
import { I_DraggableElement } from "../../../drag/domain/draggable-element";
import {
	DataType, DiagramType, ElementType, FieldType,
	I_KeyValuePair, I_SystemData, I_Vector, I_ViewBox, I_ViewPort, I_Zoom, Nullable, Scope
} from "../../../general/domain";
import { I_RelationshipsStore } from "../../../relationships/domain";
import { I_HttpInPort } from "../../../repository/domain";

export interface I_AppFactory {

	createApp(): I_AvalancheApp

	createRootDiagram(repo: I_RootDiagramRepo, key?: string): I_RootDiagram

	createDiagram(name: string, diagramType: DiagramType, viewBox: I_ViewBox, viewPort: I_ViewPort, zoom: I_Zoom, key?: string): I_Diagram

	createElement(elementType: ElementType, elementsStore: I_ElementsStore, relationshipsStore: I_RelationshipsStore, key?: string): I_Element

	createField(name: string, description: string, scope: Scope, fieldType: FieldType,
		dataTypeDef: I_TypeDef, parameters: Nullable<I_Parameter[]>, key: string): I_Field

	createTypeDef(fallbackDataType: DataType, refElement: Nullable<I_Element>, key?: string): I_TypeDef



	// Drag
	createDraggable<T>(element: T, location: I_Vector): I_Draggable<T>
	createDraggableElement(element: I_Element, location: I_Vector): I_DraggableElement


	// General
	createVector(x: number, y: number): I_Vector


	createSystemData(fieldTypes: I_KeyValuePair<FieldType, FieldType>[]): I_SystemData

	createKeyValuePair<K, V>(key: K, value: V): I_KeyValuePair<K, V>

	createAppConfigAmbient(currentAmbient: string): I_AppConfigAmbient

	createHttpInPort(appConfig: I_AppConfig): I_HttpInPort

	createRootDiagramRepo(httpInPort: I_HttpInPort): I_RootDiagramRepo


}