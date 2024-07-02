import { I_Response } from "../../repository/domain"
import { I_RootDiagram } from "./root-diagram"

export interface I_RootDiagramRepo {

	getDataAsync(key: string): Promise<I_RootDiagram>
	getDataByKey<T>(key: string): Promise<I_Response<T>>
	saveDataAsync(rd: I_RootDiagram): Promise<boolean>

}