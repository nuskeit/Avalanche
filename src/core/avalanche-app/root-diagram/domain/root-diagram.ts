import { I_RelationsStore } from '../../../relationships/domain'
import { I_Diagram } from '../diagram/domain'
import { I_ElementsStore } from '../diagram/element/domain'

// RootDiagram
export interface I_RootDiagram {
	readonly key: string
	name: string
	diagrams: I_Diagram[]
	elementsStore: I_ElementsStore
	relationshipsStore: I_RelationsStore

	addDiagram(p: I_Diagram): void
}
