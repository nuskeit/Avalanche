import * as utilNS  from "../../util/helper-numbers"
import * as g from "../../general"

export interface I_NumericRange_DTO {
    min: number
    max: number
}

export class NumericRange_DTO implements I_NumericRange_DTO {
    min: number
    max: number

    constructor(min: g.domain.Nullable<number>, max: g.domain.Nullable<number>) {
        this.min = utilNS.HelperNumbers.invalidToInfinity(min)
        this.max = utilNS.HelperNumbers.invalidToInfinity(max)
    }
}
