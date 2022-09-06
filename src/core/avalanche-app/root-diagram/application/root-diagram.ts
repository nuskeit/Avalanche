import * as g from "../../../general"
import * as rela from "../../../relationships"
import * as rootDiag from "../../root-diagram"
import * as diag from "../diagram"
import * as elem from "../diagram/element"

export class RootDiagram implements rootDiag.domain.I_RootDiagram {
	readonly key: string
	name: string
	diagrams: diag.application.Diagram[]
	elementsStore: elem.data.ElementsStore
	relationshipsStore: rela.data.RelationsStore

	constructor(key: g.domain.Nullable<string> = null) {
		this.name = "New Root Diagram"
		this.diagrams = []
		this.elementsStore = new elem.data.ElementsStore()
		this.relationshipsStore = new rela.data.RelationsStore()
		if (key == null) {
			this.key = g.domain.GlobalKey.getNewGlobalKey()
		} else {
			this.key = key
		}
	}

	public addDiagram(p: diag.application.Diagram): void {
		this.diagrams.push(p)
	}

	toJSON() {
		return {
			...this,
			__type: "RootDiagram"
		}
	}

}
