import { I_Response } from "..";

export interface I_HttpInPort {
	getAsync<P>(url: string, data?: P): Promise<I_Response<P>>
	postAsync<P>(url: string, data?: P): Promise<I_Response<P>>
	patchAsync<P>(url: string, data?: P): Promise<I_Response<P>>
	putAsync<P>(url: string, data?: P): Promise<I_Response<P>>
	deleteAsync<P>(url: string, data?: P): Promise<I_Response<P>>
	optionsAsync<P>(url: string, data?: P): Promise<I_Response<P>>
}
