import * as g from "../../general";
import * as element from "..";


export interface I_ElementsStore {
	elements: g.domain.HashTable<element.domain.I_Element>

	addElement(key: string, element: element.domain.I_Element): void
}
