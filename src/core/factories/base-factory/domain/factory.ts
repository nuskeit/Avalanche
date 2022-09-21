import { I_Creatable } from "./creatable";
import { CreationType } from "./creation-type";

export interface I_Factory {
	create<T extends I_Creatable>(t: CreationType): T
}
