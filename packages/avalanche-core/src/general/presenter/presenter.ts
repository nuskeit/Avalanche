import { I_Repository, isUndefOrNull } from ".."

export interface I_Presenter<T> {
	addDependency_repoConnector(repo: I_Repository<T>): I_Presenter<T>
	loadAsync(): void
}

export abstract class Presenter<T>  {
	// DI
	protected _repo: I_Repository<T> | undefined

	constructor(repo?: I_Repository<T>) {
		if (!isUndefOrNull(repo)) this._repo = repo
	}


	//ANALYSE REFACTORING TO "Presenter" BASE CLASE
	/**
	 * Adds DB dependency reference for future use
	 * @param repo 
	 * @returns 
	 */
	addDependency_repoConnector(repo: I_Repository<T>) {
		this._repo = repo
		return this
	}

} 