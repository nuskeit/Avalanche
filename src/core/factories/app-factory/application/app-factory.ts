import { AppConfigAmbient, AvalancheApp } from "../../../avalanche-app/application"
import { I_AppConfig, I_AppConfigAmbient, I_AvalancheApp } from "../../../avalanche-app/domain"
import { RootDiagram } from "../../../avalanche-app/root-diagram/application"
import { RootDiagramRepo } from "../../../avalanche-app/root-diagram/data"
import { Diagram } from "../../../avalanche-app/root-diagram/diagram/application"
import { I_Diagram } from "../../../avalanche-app/root-diagram/diagram/domain"
import {
	BlockEntity, ClassEntity, EnumEntity, ExternalDependencyEntity,
	GenericEntity, InterfaceEntity
} from "../../../avalanche-app/root-diagram/diagram/element/application"
import { ElementsStore } from "../../../avalanche-app/root-diagram/diagram/element/data"
import { I_Element, I_ElementsStore } from "../../../avalanche-app/root-diagram/diagram/element/domain"
import {
	EventField, MethodField, Parameter, PropertyField
} from "../../../avalanche-app/root-diagram/diagram/element/field/application"
import { I_Field, I_Parameter } from "../../../avalanche-app/root-diagram/diagram/element/field/domain"
import { TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/application"
import { I_TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/domain"
import { I_RootDiagram } from "../../../avalanche-app/root-diagram/domain"
import { I_RootDiagramRepo } from "../../../avalanche-app/root-diagram/domain/root-domain-repo"
import { Draggable } from "../../../drag/application"
import { DraggableElement } from "../../../drag/application/draggable-element"
import { I_Draggable } from "../../../drag/domain"
import { I_DraggableElement } from "../../../drag/domain/draggable-element"
import { KeyValuePair, SystemData } from "../../../general/application"
import {
	DataType, DiagramType, ElementType, FieldType,
	GlobalKey,
	I_KeyValuePair,
	I_NumericRange,
	I_SystemData,
	I_Vector, I_ViewBox, I_ViewPort, Nullable, NumericRange, ParamDirection, ParamValRef, RelationshipType, Scope, Size, undefinedToNull, Vector
} from "../../../general/domain"
import { ElementsRelationship } from "../../../relationships/application"
import { RelationshipsStore } from "../../../relationships/data"
import { I_RelationshipsStore } from "../../../relationships/domain"
import { HttpInPort } from "../../../repository/application"
import { I_HttpInPort } from "../../../repository/domain"
import { I_AppFactory } from "../domain"

export class AppFactory implements I_AppFactory {

	private static singletonInstance: AppFactory | undefined
	private constructor() { }

	static getSingleton(): AppFactory {
		if (!this.singletonInstance)
			this.singletonInstance = new AppFactory()

		return this.singletonInstance
	}


	createApp(): I_AvalancheApp {
		return new AvalancheApp()
	}

	createRootDiagram(repo: I_RootDiagramRepo, key?: string): I_RootDiagram {
		return new RootDiagram(this.createElementsStore(), this.createRelationshipsStore(), repo, key)
	}

	protected static elementsStore: I_ElementsStore | undefined
	createElementsStore(): I_ElementsStore {
		if (AppFactory.elementsStore == undefined)
			AppFactory.elementsStore = new ElementsStore()

		return AppFactory.elementsStore
	}

	protected static relationshipsStore: I_RelationshipsStore | undefined
	createRelationshipsStore(): I_RelationshipsStore {
		if (AppFactory.relationshipsStore == undefined)
			AppFactory.relationshipsStore = new RelationshipsStore()

		return AppFactory.relationshipsStore
	}


	createDiagram(name: string, diagramType: DiagramType, viewBox: I_ViewBox, viewPort: I_ViewPort, key?:string): I_Diagram {
		return new Diagram(name, diagramType, viewBox, viewPort, key)
	}

	createElement(elementType: ElementType, elementsStore: I_ElementsStore, relationshipsStore: I_RelationshipsStore, key?: string): I_Element {
		let el: I_Element
		if (elementType == ElementType.Class)
			el = new ClassEntity(relationshipsStore, key)
		else if (elementType == ElementType.Interface)
			el = new InterfaceEntity(relationshipsStore, key)
		else if (elementType == ElementType.Enum)
			el = new EnumEntity(relationshipsStore, key)
		else if (elementType == ElementType.ExternalDependency)
			el = new ExternalDependencyEntity(relationshipsStore, key)
		else if (elementType == ElementType.Block)
			el = new BlockEntity(relationshipsStore, key)
		else
			el = new GenericEntity(relationshipsStore, key)

		elementsStore.addElement(el.key, el)
		return el

	}

	createField(name: string, description: string, scope: Scope, fieldType: FieldType,
		dataTypeDef: I_TypeDef, parameters: Nullable<I_Parameter[]>, key: string = ""): I_Field {

		let f: I_Field
		switch (fieldType) {
			case FieldType.Method:
				f = new MethodField(
					name,
					description,
					scope,
					dataTypeDef,
					parameters,
					key)
				break;

			case FieldType.Event:
				f = new EventField(
					name,
					description,
					scope,
					dataTypeDef,
					parameters,
					key)
				break;

			default:

				f = new PropertyField(
					name,
					description,
					scope,
					dataTypeDef,
					key)

				break;
		}
		return f

	}

	createParameter(
		name: string,
		direction: ParamDirection,
		category: ParamValRef,
		dataTypeDef: I_TypeDef,
		key?: string): I_Parameter {
		return new Parameter(key == undefined ? GlobalKey.getNewGlobalKey() : key, name, direction, category, dataTypeDef)

	}

	createTypeDef(fallbackDataType: DataType, refElement: Nullable<I_Element>, key?: string): I_TypeDef {
		return new TypeDef(fallbackDataType, undefinedToNull(refElement), key)
	}

	createElementsRelationship(
		sourceKey: string,
		targetKey: string,
		sourceElementKey: string,
		targetElementKey: string,
		tag: string,
		relationshipType: RelationshipType,
		sourceMultiplicity: I_NumericRange = new NumericRange(),
		targetMultiplicity: I_NumericRange = new NumericRange(),
		key: Nullable<string> = null
	) {
		return new ElementsRelationship(
			sourceKey,
			targetKey,
			sourceElementKey,
			targetElementKey,
			tag,
			relationshipType,
			sourceMultiplicity,
			targetMultiplicity,
			key

		)
	}



	// Drag
	createDraggable<T>(element: T, location: I_Vector): I_Draggable<T> {
		return new Draggable<T>(element, location)
	}
	createDraggableElement(element: I_Element, location: I_Vector, size: Size = { width: "auto", height: "auto" }): I_DraggableElement {
		return new DraggableElement(element, location, size)
	}


	// General
	createVector(x: number, y: number): I_Vector {
		return new Vector(x, y)
	}


	createSystemData(fieldTypes: I_KeyValuePair<FieldType, FieldType>[]): I_SystemData {
		return new SystemData(fieldTypes)
	}

	createKeyValuePair<K, V>(key: K, value: V): I_KeyValuePair<K, V> {
		return new KeyValuePair<K, V>(key, value)
	}

	createAppConfigAmbient(): I_AppConfigAmbient {
		// REFACTOR THIS: Get current ambient from environment variable of config file
		return new AppConfigAmbient("dev")
	}

	createHttpInPort(appConfig: I_AppConfig): I_HttpInPort {
		return new HttpInPort(appConfig)
	}

	createRootDiagramRepo(httpInPort: I_HttpInPort): I_RootDiagramRepo {
		return new RootDiagramRepo(httpInPort)
	}


}

