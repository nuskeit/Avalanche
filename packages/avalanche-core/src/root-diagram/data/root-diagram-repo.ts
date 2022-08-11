import { RootDiagram_DTO } from "..";
import { I_HttpInPort, I_Repository, Repository, I_Response, Reviver, I_RootDiagram, RootDiagram } from "../..";

export class RootDiagramRepo extends Repository implements I_Repository<I_RootDiagram> {

	constructor(httpInPort: I_HttpInPort) {
		super(httpInPort)
	}

	async getDataAsync(key: string): Promise<I_RootDiagram> {
		const response = await this.getDataByKey<RootDiagram_DTO>(key) //JSON.parse(PersistentData)
		const rootDiagDto: RootDiagram_DTO = response.data
		const rootDiagram = Reviver.createRootDiagram(rootDiagDto, this)

		if (rootDiagram instanceof RootDiagram)
			return rootDiagram
		else
			throw new Error("ERROR: getDataAsync: Type mismatch.")
	}

	async getDataByKey<T>(key: string): Promise<I_Response<T>> {
		return await this.httpInPort.getAsync<T>(`root-diagram/${key}`)
	}

}