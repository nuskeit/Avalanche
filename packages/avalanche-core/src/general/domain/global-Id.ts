export class GlobalId {
    /** General ID to be used by every component */
    static lastGlobalId: number = 0
    static getNewGlobalId(): number {
        ++this.lastGlobalId
        return this.lastGlobalId
    }
}