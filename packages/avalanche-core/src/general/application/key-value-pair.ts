import { I_KeyValuePair } from "../domain"

export class KeyValuePair<K, V> implements I_KeyValuePair<K, V> {
	key: K
	value: V

	constructor(key: K, value: V) {
		this.key = key
		this.value = value 
	}
}

