import { GlobalKey } from "../../../general/domain"
import { I_RelationshipsStore } from "../../../relationships/domain"
import { Diagram } from "../diagram/application"
import { I_Diagram } from "../diagram/domain"
import { I_ElementsStore } from "../diagram/element/domain"
import { I_RootDiagram } from "../domain"
import { I_RootDiagramRepo } from "../domain/root-domain-repo"

export class RootDiagram implements I_RootDiagram {
	readonly key: string
	name: string
	diagrams: I_Diagram[]
	elementsStore: I_ElementsStore
	relationshipsStore: I_RelationshipsStore
	repo: I_RootDiagramRepo

	constructor(elementsStore: I_ElementsStore,
		relationshipsStore: I_RelationshipsStore, repo: I_RootDiagramRepo,
		key?: string) {
		this.name = "New Root Diagram"
		this.diagrams = []
		this.elementsStore = elementsStore
		this.relationshipsStore = relationshipsStore
		this.repo = repo
		if (!key) {
			this.key = GlobalKey.getNewGlobalKey()
		} else {
			this.key = key
		}
	}

	addDiagram(p: Diagram): void {
		this.diagrams.push(p)
	}

	async save(): Promise<boolean> {
		return await this.repo.saveDataAsync(this)
	}

	toJSON() {
		return {
			...this,
			__type: "RootDiagram"
		}
	}

}
