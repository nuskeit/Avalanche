import * as repo from "../../repository"
import { AvalancheApp } from "../application"
import * as rootDiag from "../../root-diagram"

export interface I_AvalancheApp {
	/**
	 * One session must have a RootDiagram loaded. If this is a new session, the RootDiagram must
	 * be created from a template
	*/
	rootDiagram: rootDiag.domain.I_RootDiagram

	/**
	 * provides port to consume from the web api
	*/
	httpInPort: repo.domain.I_HttpInPort


	loadRootPlanAsync(key: string, alternateRepo?: repo.domain.I_Repository<rootDiag.domain.I_RootDiagram>): Promise<AvalancheApp>

}