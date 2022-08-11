import { FieldType, I_KeyValuePair } from "..";

export interface I_SystemData {
	fieldTypes: I_KeyValuePair<FieldType, FieldType>[]
}