import * as factories from "../../factories"
import * as repo from "../../repository"
import * as rootDiag from "../root-diagram"

export interface I_AvalancheApp {
	/**
	 * One session must have a RootDiagram loaded. If this is a new session, the RootDiagram must
	 * be created from a template
	*/
	rootDiagram: rootDiag.domain.I_RootDiagram

	/**
	 * provides all factory methods that are not specific or specially treated
	*/
	generalFactory: factories.domain.I_GeneralFactory

	/**
	 * provides port to consume from the web api
	*/
	httpInPort: repo.domain.I_HttpInPort
	

}