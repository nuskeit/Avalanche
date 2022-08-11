import { I_Element } from '..';
import {
    DiagramType, DraggableWrapper, Dragger, ElementsStore,
    getRandomPosition, GlobalKey, HashTable, I_DraggableWrapper,
    Nullable, RelationsStore, Vector
} from '../../..';

export interface I_Diagram {
    readonly key: string
    name: string
    readonly diagramType: DiagramType
    readonly elements: HashTable<I_DraggableWrapper<I_Element>>
    readonly elementsStore: ElementsStore
    readonly relationshipsStore: RelationsStore
    readonly rootElements: HashTable<I_Element>
    visible: boolean

    addElement(element: I_Element): void
    createElement(element: I_Element): void

}

export class Diagram implements I_Diagram {
    constructor(name: string, diagramType: DiagramType, elementsStore: ElementsStore, relationshipsStore: RelationsStore) {
        this._key = GlobalKey.getNewGlobalKey()
        this.name = name
        this._diagramType = diagramType
        this.visible = true
        this._elements = {}
        this._elementsStore = elementsStore
        this._relationshipsStore = relationshipsStore
    }
    private _elementsStore: ElementsStore
    private _relationshipsStore: RelationsStore

    private _key: string
    public get key(): string { return this._key }
    public name: string

    private _diagramType: DiagramType
    public get diagramType(): DiagramType { return this._diagramType }
    public visible: boolean

    private _elements: HashTable<I_DraggableWrapper<I_Element>>
    public get elements(): HashTable<I_DraggableWrapper<I_Element>> { return this._elements }

    public get rootElements(): HashTable<I_Element> { return this._elementsStore.elements }

    public get elementsStore(): ElementsStore { return this._elementsStore }
    public get relationshipsStore(): RelationsStore { return this._relationshipsStore }

    addElement(element: I_Element, x: Nullable<number> = null, y: Nullable<number> = null): void {
        let _x: number, _y: number
        if (x == null) _x = getRandomPosition(300, 50); else _x = x
        if (y == null) _y = getRandomPosition(200, 50); else _y = y
        this.elements[element.key] = new DraggableWrapper<I_Element>(element, new Dragger(element.key, new Vector(_x, _y), new Vector(_x, _y)))
    }

    createElement(element: I_Element, x: Nullable<number> = null, y: Nullable<number> = null): void {
        this._elementsStore.addElement(element.key, element)
        this.addElement(element, x, y)
    }


    __setInitialState(state: any) {
        this._key = state['_key']
        this.name = state['name']
        this._diagramType = state['_diagramType']
        this.visible = state['visible']
        this._elements = state['_elements']
        this._elementsStore = state['_elementsStore'] //ref to rootDiagram elements store
        this._relationshipsStore = state['_relationshipsStore'] //ref to rootDiagram relationships store
    }

    toJSON() {
        return {
            __type: "Diagram",
            ...this
        }
    }

}
