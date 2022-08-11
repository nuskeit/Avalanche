import { HashTable } from ".";
import { I_Element } from "../..";


export class ElementsStore {
	elements: HashTable<I_Element> = {}

	addElement(key: string, element: I_Element) {
		this.elements[key] = element
	}

	toJSON() {
		return {
			__type: "ElementsStore",
			...this
		}
	}
}
