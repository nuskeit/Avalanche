import { I_HttpInPort } from '..';

export abstract class Repository {
	readonly httpInPort: I_HttpInPort
	constructor(httpInPort: I_HttpInPort) {
		this.httpInPort = httpInPort
	}
}