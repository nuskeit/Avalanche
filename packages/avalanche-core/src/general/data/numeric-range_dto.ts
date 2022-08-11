import {Nullable } from "../../.."
import { HelperNumbers } from "../../util/helper-numbers"

export interface I_NumericRange_DTO {
    min: number
    max: number
}

export class NumericRange_DTO implements I_NumericRange_DTO {
    min: number
    max: number

    constructor(min: Nullable<number>, max: Nullable<number>) {
        this.min = HelperNumbers.invalidToInfinity(min)
        this.max = HelperNumbers.invalidToInfinity(max)
    }
}
