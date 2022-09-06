import * as repositoryNS from "../../repository"
import * as g from "../../general"

export class SysyemDataRepo extends repositoryNS.application.Repository implements repositoryNS.domain.I_Repository<g.domain.I_SystemData> {

	constructor(httpInPort: repositoryNS.domain.I_HttpInPort) {
		super(httpInPort)
	}

	async getDataAsync(): Promise<g.domain.I_SystemData> {
		return new g.application.SystemData(this.getFieldTypes())
	}

	getFieldTypes(): g.domain.I_KeyValuePair<g.domain.FieldType, g.domain.FieldType>[] {
		const result: g.domain.I_KeyValuePair<g.domain.FieldType, g.domain.FieldType>[] = []
		result.push(new g.application.KeyValuePair(g.domain.FieldType.Event, g.domain.FieldType.Event))
		result.push(new g.application.KeyValuePair(g.domain.FieldType.Method, g.domain.FieldType.Method))
		result.push(new g.application.KeyValuePair(g.domain.FieldType.Property, g.domain.FieldType.Property))
		return result
	}

}