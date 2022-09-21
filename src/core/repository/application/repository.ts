import { I_HttpInPort } from "../domain"

export abstract class Repository {
	readonly httpInPort: I_HttpInPort
	constructor(httpInPort: I_HttpInPort) {
		this.httpInPort = httpInPort
	}
}