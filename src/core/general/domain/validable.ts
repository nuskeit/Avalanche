import { HashTable } from "./generic-types"

export interface I_Validable {
	validate(): void
	readonly valid: boolean
	readonly validProp: HashTable<boolean>
}