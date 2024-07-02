import * as diag from "../../diagram"
import * as elem from "../../element"
import * as rela from "../../relationships"
import * as repo from "../../repository"

export class RootDiagram_DTO implements repo.data.I_Dto {
	key: string
	name: string
	diagrams: diag.data.Diagram_DTO[]
	elementsStore: elem.data.Element_DTO[]
	relationshipsStore: rela.data.ElementsRelationship_DTO[]

	constructor(
		key: string,
		name: string,
		diagrams: diag.data.Diagram_DTO[],
		elementsStore: elem.data.Element_DTO[],
		relationshipsStore: rela.data.ElementsRelationship_DTO[]
	) {
		this.key = key
		this.name = name
		this.diagrams = diagrams
		this.elementsStore = elementsStore
		this.relationshipsStore = relationshipsStore
	}
}