import { AppFactory } from "../../factories/app-factory/application"
import { Repository } from "../../repository/application"
import { I_HttpInPort, I_Repository } from "../../repository/domain"
import { FieldType, I_KeyValuePair, I_SystemData } from "../domain"

export class SysyemDataRepo extends Repository implements I_Repository<I_SystemData> {

	constructor(httpInPort: I_HttpInPort) {
		super(httpInPort)
	}

	async getDataAsync(): Promise<I_SystemData> {
		return AppFactory.getSingleton().createSystemData(this.getFieldTypes())
	}

	getFieldTypes(): I_KeyValuePair<FieldType, FieldType>[] {
		const result: I_KeyValuePair<FieldType, FieldType>[] = []
		result.push(AppFactory.getSingleton().createKeyValuePair(FieldType.Event, FieldType.Event))
		result.push(AppFactory.getSingleton().createKeyValuePair(FieldType.Method, FieldType.Method))
		result.push(AppFactory.getSingleton().createKeyValuePair(FieldType.Property, FieldType.Property))
		return result
	}

}