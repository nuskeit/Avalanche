import { HashTable } from "../../../../../general/domain";
import { I_Element, I_ElementsStore } from "../domain";


export class ElementsStore implements I_ElementsStore {
	elements: HashTable<I_Element> = {}

	addElement(key: string, element: I_Element) {
		this.elements[key] = element
		this.elements = { ...this.elements }
	}

	toJSON() {
		return {
			__type: "ElementsStore",
			...this
		}
	}
}
