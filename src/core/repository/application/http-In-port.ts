import axios, { AxiosInstance } from 'axios';
import * as avalancheAppNS from '../../avalanche-app';
import * as repositoryNS from '../../repository';

export class HttpInPort implements repositoryNS.domain.I_HttpInPort {

	readonly appConfig: avalancheAppNS.domain.I_AppConfig
	_axios: AxiosInstance

	constructor(appConfig: avalancheAppNS.domain.I_AppConfig) {
		this.appConfig = appConfig
		this._axios = axios.create({
			baseURL: appConfig.url.API_BASE_URL,
			headers: {
				'Content-Type': 'application/json; charset=UTF-8',
				'Accept': '*/*',
				'Cache-Control': 'no-cache',
			},
			responseType: 'json',
			withCredentials: false,
		})

	}


	async getAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>> {
		const response = await this._axios.get(url, data)
		return await response.data
	}
	async postAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>> {
		const response = await this._axios.post(url, data)
		return await response.data
	}
	async patchAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>> {
		const response = await this._axios.patch(url, data)
		return await response.data
	}
	async putAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>> {
		const response = await this._axios.put(url, data)
		return await response.data
	}
	async deleteAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>> {
		const response = await this._axios.delete(url, data)
		return await response.data
	}
	async optionsAsync<P>(url: string, data?: P): Promise<repositoryNS.domain.I_Response<P>> {
		const response = await this._axios.options(url, data)
		return await response.data
	}

}