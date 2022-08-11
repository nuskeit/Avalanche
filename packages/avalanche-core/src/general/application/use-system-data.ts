import { AxiosResponse } from "axios";
import { FieldType, FieldTypeDTO } from "../../..";

export const useSystemData = (): any => {

    const getFieldTypesAsync = async () => {
        const result: AxiosResponse = await axios.get("field-types.json")
        const data = await result.data
        return data
    }


    return { getFieldTypesAsync, getFieldTypes }

}