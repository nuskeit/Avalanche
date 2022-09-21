import { AppConfigAmbient, AvalancheApp } from "../../../avalanche-app/application"
import { I_AppConfig, I_AppConfigAmbient, I_AvalancheApp } from "../../../avalanche-app/domain"
import { RootDiagram } from "../../../avalanche-app/root-diagram/application"
import { RootDiagramRepo } from "../../../avalanche-app/root-diagram/data"
import { Diagram } from "../../../avalanche-app/root-diagram/diagram/application"
import { I_Diagram } from "../../../avalanche-app/root-diagram/diagram/domain"
import {
	BlockEntity, ClassEntity, ComponentEntity, EnumEntity, ExternalDependencyEntity,
	GenericEntity, InterfaceEntity
} from "../../../avalanche-app/root-diagram/diagram/element/application"
import { I_Element, I_ElementsStore } from "../../../avalanche-app/root-diagram/diagram/element/domain"
import {
	EventField, MethodField, Parameter, PropertyField
} from "../../../avalanche-app/root-diagram/diagram/element/field/application"
import { I_Field, I_Parameter } from "../../../avalanche-app/root-diagram/diagram/element/field/domain"
import { TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/application"
import { I_TypeDef } from "../../../avalanche-app/root-diagram/diagram/element/field/type-def/domain"
import { I_RootDiagram } from "../../../avalanche-app/root-diagram/domain"
import { I_RootDiagramRepo } from "../../../avalanche-app/root-diagram/domain/root-domain-repo"
import { Draggable, Dragger } from "../../../drag/application"
import { I_Draggable, I_Dragger } from "../../../drag/domain"
import { KeyValuePair, SystemData } from "../../../general/application"
import {
	DataType, DiagramType, ElementType, FieldType,
	GlobalKey,
	I_KeyValuePair,
	I_SystemData,
	I_Vector, I_ViewBox, I_ViewPort, Nullable, ParamDirection, ParamValRef, undefinedToNull, Vector
} from "../../../general/domain"
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

	createRootDiagram(key?: string): I_RootDiagram {
		return new RootDiagram(key)
	}

	createDiagram(name: string, diagramType: DiagramType, viewBox: I_ViewBox, viewPort: I_ViewPort): I_Diagram {
		return new Diagram(name, diagramType, viewBox, viewPort)
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

	createField(name: string, fieldType: FieldType, dataTypeDef: I_TypeDef,
		parameters: Nullable<I_Parameter[]>, key?: string): I_Field {
		let f: I_Field
		switch (fieldType) {
			case FieldType.Method:
				f = new MethodField(
					name,
					dataTypeDef,
					parameters, key)
				break;

			case FieldType.Event:
				f = new EventField(
					name,
					dataTypeDef,
					parameters, key)
				break;

			default:

				f = new PropertyField(
					name,
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
		key ?: string): I_Parameter {
		return new Parameter(key==undefined? GlobalKey.getNewGlobalKey() :key, name, direction, category, dataTypeDef)

	}

	createTypeDef(fallbackDataType: DataType, refElement: Nullable<I_Element>, key?: string): I_TypeDef {
		return new TypeDef(fallbackDataType, undefinedToNull(refElement), key)
	}



	// Drag
	createDragger(key: string, location: I_Vector, mouseLocation: I_Vector): I_Dragger {
		return new Dragger(key, location, mouseLocation)
	}

	createDraggable<T>(element: T, dragger: I_Dragger): I_Draggable<T> {
		return new Draggable<T>(element, dragger)
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

	createAppConfigAmbient(currentAmbient: string): I_AppConfigAmbient {
		return new AppConfigAmbient(currentAmbient)
	}

	createHttpInPort(appConfig: I_AppConfig): I_HttpInPort {
		return new HttpInPort(appConfig)
	}

	createRootDiagramRepo(httpInPort: I_HttpInPort): I_RootDiagramRepo {
		return new RootDiagramRepo(httpInPort)
	}


}

