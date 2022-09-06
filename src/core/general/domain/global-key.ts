import { GlobalId } from "./global-Id"
export class GlobalKey {
    /** General Key based on General ID to be used by every component */
    static lastGlobalKey: string = ""
    static getNewGlobalKey(): string {
        this.lastGlobalKey = "AVA" + GlobalId.getNewGlobalId().toString()
        return this.lastGlobalKey
    }
}