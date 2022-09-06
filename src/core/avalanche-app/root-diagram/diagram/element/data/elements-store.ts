import * as g from "../../../../../general";
import * as elem from "../../element";


export class ElementsStore implements elem.domain.I_ElementsStore {
	elements: g.domain.HashTable<elem.domain.I_Element> = {}

	addElement(key: string, element: elem.domain.I_Element) {
		this.elements[key] = element
	}

	toJSON() {
		return {
			__type: "ElementsStore",
			...this
		}
	}
}
