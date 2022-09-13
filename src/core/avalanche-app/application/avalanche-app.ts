import * as g from "../../general";
import * as avalancheApp from "../../avalanche-app"
import * as factories from "../../factories";
import * as repository from "../../repository";
import * as repo from "../../repository";
import * as rootDiag from "../root-diagram";
import { I_RootDiagram } from "../root-diagram/domain";
import { RootDiagram } from "../root-diagram/application";

export class AvalancheApp implements avalancheApp.domain.I_AvalancheApp {
	_rootDiagram: I_RootDiagram
	get rootDiagram(): I_RootDiagram {return this._rootDiagram}

	repository: repository.domain.I_Repository<rootDiag.domain.I_RootDiagram>

	appConfigAmbient: avalancheApp.domain.I_AppConfigAmbient

	generalFactory: factories.domain.I_GeneralFactory

	httpInPort: repo.domain.I_HttpInPort

	constructor() {
		// get Config dependency to inject
		this.appConfigAmbient = new avalancheApp.application.AppConfigAmbient("dev")

		// create httpInPort dependency to inject
		this.httpInPort = new repo.application.HttpInPort(this.appConfigAmbient.getApiConfig())

		this.repository = new rootDiag.data.RootDiagramRepo(this.httpInPort)

		this._rootDiagram = new RootDiagram()

		// create Repository dependency to inject
		this.generalFactory = new factories.application.GeneralFactory(this.rootDiagram.relationshipsStore)

	}

	// constructor(httpInPort: I_HttpInPort, generalFactory: I_GeneralFactory, repo: I_Repository<I_RootDiagram>) {
	// 	this.generalFactory = generalFactory

	// 	this.httpInPort = httpInPort

	// 	this.repository = repo

	// 	this._rootDiagram = new RootDiagram(GlobalKey.getNewGlobalKey())
	// }

	//get rootDiagram(): I_RootDiagram { return this._rootDiagram }

	/**
	 * Method-setter is used to avoid unintentional assignments
	*/
	setRootDiagram(rd: rootDiag.domain.I_RootDiagram) {
		this._rootDiagram = rd
	}

	/**
	 * Async. Loads the state and all necesary data. Optional parameter alternateRepo
	 * is to be used on this signle request.
	 * @param alternateRepo
	 * @returns RootDiagramPresenter
	 */
	async loadRootPlanAsync(key: string, alternateRepo?: repo.domain.I_Repository<rootDiag.domain.I_RootDiagram>): Promise<AvalancheApp> {
		if (this.repository != undefined) {
			if (g.domain.isUndefOrNull(alternateRepo)) {
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