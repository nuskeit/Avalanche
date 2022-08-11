import { FieldType, I_KeyValuePair, I_SystemData } from "../domain";

export class SystemData implements I_SystemData {
	fieldTypes: I_KeyValuePair<FieldType, FieldType>[]
	constructor(fieldTypes: I_KeyValuePair<FieldType, FieldType>[]) {
		this.fieldTypes = fieldTypes
	}
}