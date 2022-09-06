import * as repositoryNS  from "../../repository"

export interface I_HttpInPort {
	getAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>>
	postAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>>
	patchAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>>
	putAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>>
	deleteAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>>
	optionsAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>>
}
