import { I_HttpInPort, Repository } from "../..";
import { FieldType, I_KeyValuePair, I_Repository, I_SystemData } from "..";
import { KeyValuePair, SystemData } from "../application";

export class SysyemDataRepo extends Repository implements I_Repository<I_SystemData> {

	constructor(httpInPort: I_HttpInPort) {
		super(httpInPort)
	}

	async getDataAsync(): Promise<I_SystemData> {
		return new SystemData(this.getFieldTypes())
	}

	getFieldTypes(): I_KeyValuePair<FieldType, FieldType>[] {
		const result: I_KeyValuePair<FieldType, FieldType>[] = []
		result.push(new KeyValuePair(FieldType.Event, FieldType.Event))
		result.push(new KeyValuePair(FieldType.Method, FieldType.Method))
		result.push(new KeyValuePair(FieldType.Property, FieldType.Property))
		return result
	}

}