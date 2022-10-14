import { DtoFactory, Reviver } from "../../../factories/data-transformation-services/application"
import { Repository } from "../../../repository/application"
import { I_HttpInPort, I_Repository, I_Response } from "../../../repository/domain"
import { RootDiagram } from "../application"
import { I_RootDiagram } from "../domain"
import { I_RootDiagramRepo } from "../domain/root-domain-repo"
import { RootDiagram_DTO } from "./root-diagram-dto"

export class RootDiagramRepo extends Repository implements I_Repository<I_RootDiagram>, I_RootDiagramRepo {

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


	async saveDataAsync(rd: I_RootDiagram): Promise<boolean> {
		const rootDiagDto = DtoFactory.getSingleton().createRootDiagramDto(rd)
		console.log('rootDiagDto.key TO SAVE: ',rootDiagDto.key);
		const result = await this.httpInPort.postAsync<RootDiagram_DTO>(`root-diagram/${rootDiagDto.key}`, rootDiagDto)

		if (result.httpStatus == "200")
			return true
		else
			throw false
	}


}