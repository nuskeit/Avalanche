import { isUndefOrNull, I_Repository, Presenter } from "../..";
import { I_RootDiagram, RootDiagram } from "..";

export class RootDiagramPresenter extends Presenter<I_RootDiagram> {

	rootDiagram: I_RootDiagram
	selectedDiagramIndex: number

	constructor(repo: I_Repository<I_RootDiagram>, key: string) {
		super(repo)
		this.selectedDiagramIndex = 0
//		this.rootDiagram = new RootDiagram(repo, key)
	}

	/**
	 * Async. Loads the state and all necesary data. Optional parameter repo is to be used on this signle request.
	 * @param repo 
	 * @returns RootDiagramPresenter
	 */
	async loadAsync(repo?: I_Repository<RootDiagram>) {
		let tempKey = "rd1"
		if (this._repo != undefined) {
			if (isUndefOrNull(repo)) {
				this.rootDiagram = await this._repo.getDataAsync(tempKey)
			} else {
				// @ts-ignore undefined checked
				this.rootDiagram = await repo.getDataAsync(tempKey)
			}
		}
		else
			throw new Error("repo dependency not assigned")
		return this
	}

	//END - ANALYSE REFACTORING TO BASE CLASE


	async selectElement(key: string, altKey: boolean) {
		const rd = await this.rootDiagram
		if ((key >= "1" && key <= rd.diagrams.length.toString()) && altKey)
			this.selectedDiagramIndex = Number(key) - 1
	}

}
