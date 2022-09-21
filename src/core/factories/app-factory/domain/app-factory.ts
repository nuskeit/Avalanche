import { I_AppConfig, I_AppConfigAmbient, I_AvalancheApp } from "../../../avalanche-app/domain";
import { RootDiagramRepo } from "../../../avalanche-app/root-diagram/data";
import { I_Diagram } from "../../../avalanche-app/root-diagram/diagram/domain";
import { I_Element, I_ElementsStore } from "../../../avalanche-app/root-diagram/diagram/element/domain";
import { I_Field, I_Parameter } from "../../../avalanche-app/root-diagram/diagram/element/field/domain";
import { I_TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/domain";
import { I_RootDiagram } from "../../../avalanche-app/root-diagram/domain";
import { I_RootDiagramRepo } from "../../../avalanche-app/root-diagram/domain/root-domain-repo";
import { I_Draggable, I_Dragger } from "../../../drag/domain";
import {
	DataType, DiagramType, ElementType, FieldType,
	I_KeyValuePair, I_SystemData, I_Vector, I_ViewBox, I_ViewPort, Nullable
} from "../../../general/domain";
import { I_RelationshipsStore } from "../../../relationships/domain";
import { I_HttpInPort } from "../../../repository/domain";

export interface I_AppFactory {

	createApp(): I_AvalancheApp

	createRootDiagram(key?: string): I_RootDiagram

	createDiagram(name: string, diagramType: DiagramType, viewBox: I_ViewBox, viewPort: I_ViewPort): I_Diagram

	createElement(elementType: ElementType, elementsStore: I_ElementsStore, relationshipsStore: I_RelationshipsStore, key?: string): I_Element

	createField(name: string, fieldType: FieldType, dataTypeDef: I_TypeDef,
		parameters: Nullable<I_Parameter[]>, key?: string): I_Field

	createTypeDef(fallbackDataType: DataType, refElement: Nullable<I_Element>, key?: string): I_TypeDef



	// Drag
	createDragger(key: string, location: I_Vector, mouseLocation: I_Vector): I_Dragger
	createDraggable<T>(element: T, dragger: I_Dragger): I_Draggable<T>


	// General
	createVector(x: number, y: number): I_Vector


	createSystemData(fieldTypes: I_KeyValuePair<FieldType, FieldType>[]): I_SystemData

	createKeyValuePair<K, V>(key: K, value: V): I_KeyValuePair<K, V>

	createAppConfigAmbient(currentAmbient: string): I_AppConfigAmbient

	createHttpInPort(appConfig: I_AppConfig): I_HttpInPort

	createRootDiagramRepo(httpInPort: I_HttpInPort): I_RootDiagramRepo


}