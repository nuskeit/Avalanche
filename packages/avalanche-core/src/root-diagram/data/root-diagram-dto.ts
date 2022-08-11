import { Diagram_DTO } from ".."
import { I_Dto, ElementsRelationship_DTO, Element_DTO } from "../.."

export class RootDiagram_DTO implements I_Dto {
	key: string
	name: string
	diagrams: Diagram_DTO[]
	elementsStore: Element_DTO[]
	relationshipsStore: ElementsRelationship_DTO[]

	constructor(
		key: string,
		name: string,
		diagrams: Diagram_DTO[],
		elementsStore: Element_DTO[],
		relationshipsStore: ElementsRelationship_DTO[]
	) {
		this.key = key
		this.name = name
		this.diagrams = diagrams
		this.elementsStore = elementsStore
		this.relationshipsStore = relationshipsStore
	}
}