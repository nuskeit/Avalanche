import { Reviver } from "../../../data-transformation-services/application"
import { Repository } from "../../../repository/application"
import { I_HttpInPort, I_Repository, I_Response } from "../../../repository/domain"
import { RootDiagram } from "../application"
import { I_RootDiagram } from "../domain"
import { RootDiagram_DTO } from "./root-diagram-dto"

export class RootDiagramRepo extends Repository implements I_Repository<I_RootDiagram> {

	constructor(httpInPort: I_HttpInPort) {
		super(httpInPort)
	}

	async getDataAsync(key: string): Promise<I_RootDiagram> {
		const response = await this.getDataByKey<RootDiagram_DTO>(key) //JSON.parse(PersistentData)
		const rootDiagDto: RootDiagram_DTO = response.data
		const rootDiagram = (new Reviver()).createRootDiagram(rootDiagDto)

		if (rootDiagram instanceof RootDiagram)
			return rootDiagram
		else
			throw new Error("ERROR: getDataAsync: Type mismatch.")
	}

	async getDataByKey<T>(key: string): Promise<I_Response<T>> {
		return await this.httpInPort.getAsync<T>(`root-diagram/${key}`)
	}

}