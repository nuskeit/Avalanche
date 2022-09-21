import { GlobalKey, Nullable } from "../../../general/domain"
import { RelationshipsStore } from "../../../relationships/data"
import { Diagram } from "../diagram/application"
import { ElementsStore } from "../diagram/element/data"
import { I_RootDiagram } from "../domain"

export class RootDiagram implements I_RootDiagram {
	readonly key: string
	name: string
	diagrams: Diagram[]
	elementsStore: ElementsStore
	relationshipsStore: RelationshipsStore

	constructor(key?: string) {
		this.name = "New Root Diagram"
		this.diagrams = []
		this.elementsStore = new ElementsStore()
		this.relationshipsStore = new RelationshipsStore()
		if (!key) {
			this.key = GlobalKey.getNewGlobalKey()
		} else {
			this.key = key
		}
	}

	public addDiagram(p: Diagram): void {
		this.diagrams.push(p)
	}

	toJSON() {
		return {
			...this,
			__type: "RootDiagram"
		}
	}

}
