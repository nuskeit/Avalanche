import { I_Repository } from "./";

export interface I_Storable {
	getDataAsync(): void
}

export abstract class Storable<T> {
	readonly repository: I_Repository<T>

	constructor(repository: I_Repository<T>) {
		this.repository = repository
	}
}