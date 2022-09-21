import { AppFactory } from "../../factories/app-factory/application";
import { GlobalKey, isUndefOrNull } from "../../general/domain";
import { I_HttpInPort, I_Repository } from "../../repository/domain";
import { I_AppConfigAmbient, I_AvalancheApp } from "../domain";
import { I_RootDiagram } from "../root-diagram/domain";

export class AvalancheApp implements I_AvalancheApp {
	_rootDiagram: I_RootDiagram
	get rootDiagram(): I_RootDiagram { return this._rootDiagram }

	repository: I_Repository<I_RootDiagram>

	appConfigAmbient: I_AppConfigAmbient

	httpInPort: I_HttpInPort

	constructor() {
		// get Config dependency to inject
		this.appConfigAmbient = AppFactory.getSingleton().createAppConfigAmbient("dev")

		// create httpInPort dependency to inject into repositories
		this.httpInPort = AppFactory.getSingleton().createHttpInPort(this.appConfigAmbient.getApiConfig())

		this.repository = AppFactory.getSingleton().createRootDiagramRepo(this.httpInPort)

		this._rootDiagram = AppFactory.getSingleton().createRootDiagram(GlobalKey.getNewGlobalKey())

		// create Repository dependency to inject

	}

	// 	this.httpInPort = httpInPort

	// 	this.repository = repo

	// }

	//get rootDiagram(): I_RootDiagram { return this._rootDiagram }

	/**
	 * Method-setter is used to avoid unintentional assignments
	*/
	setRootDiagram(rd: I_RootDiagram) {
		this._rootDiagram = rd
	}

	/**
	 * Async. Loads the state and all necesary data. Optional parameter alternateRepo
	 * is to be used on this signle request.
	 * @param alternateRepo
	 * @returns RootDiagramPresenter
	 */
	async loadRootPlanAsync(key: string, alternateRepo?: I_Repository<I_RootDiagram>): Promise<AvalancheApp> {
		if (this.repository != undefined) {
			if (isUndefOrNull(alternateRepo)) {
				this._rootDiagram = await this.repository.getDataAsync(key)
			} else {
				// @ts-ignore undefined checked
				this.rootDiagram = await alternateRepo.getDataAsync(key)
			}
		}
		else
			throw new Error("AvalancheApp: repository not assigned")

		return this
	}


}