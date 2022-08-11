
export interface I_NumericRange {
    min: number
    max: number
}

export class NumericRange implements I_NumericRange {
    min: number
    max: number
    constructor(min: number = -Infinity, max: number = Infinity) {
        this.min = min
        this.max = max
    }
}
