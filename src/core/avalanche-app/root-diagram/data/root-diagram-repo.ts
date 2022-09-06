import * as dts from "../../../data-transformation-services"
import * as repo from "../../../repository"
import * as rootDiag from "../../root-diagram"

export class RootDiagramRepo extends repo.application.Repository implements repo.domain.I_Repository<rootDiag.domain.I_RootDiagram> {

	constructor(httpInPort: repo.domain.I_HttpInPort) {
		super(httpInPort)
	}

	async getDataAsync(key: string): Promise<rootDiag.domain.I_RootDiagram> {
		const response = await this.getDataByKey<rootDiag.data.RootDiagram_DTO>(key) //JSON.parse(PersistentData)
		const rootDiagDto: rootDiag.data.RootDiagram_DTO = response.data
		const rootDiagram = dts.application.Reviver.createRootDiagram(rootDiagDto)

		if (rootDiagram instanceof rootDiag.application.RootDiagram)
			return rootDiagram
		else
			throw new Error("ERROR: getDataAsync: Type mismatch.")
	}

	async getDataByKey<T>(key: string): Promise<repo.domain.I_Response<T>> {
		return await this.httpInPort.getAsync<T>(`root-diagram/${key}`)
	}

}