export type Nullable<T> = T | null;

export interface I_Vector {
	x: number
	y: number
}

export class ValueAuto<T> {
	value: T
	auto: boolean
	get ValueAuto(): T | "auto" {
		return this.auto ? "auto" : this.value
	}

	constructor(
		value: T,
		auto: boolean
	) {
		this.value = value
		this.auto = auto
	}
}

export class Size {
	width: number
	height: number
	
	constructor(width: number, height: number) {
		this.width = width
		this.height = height
	}
}

export class Vector implements I_Vector {
	private _x: number
	private _y: number
	constructor(x: number, y: number) {
		this._x = Math.floor(x)
		this._y = Math.floor(y)
	}
	public get x(): number { return this._x }
	public set x(value: number) { this._x = Math.round(value) }

	public get y(): number { return this._y }
	public set y(value: number) { this._y = Math.round(value) }

	toJSON() {
		return {
			x: this._x,
			y: this._y,
		}
	}
}


export interface HashTable<T> {
	[key: string]: T
}

export function HashTabletoTupleArray<T>(ht: HashTable<T>): [string, T][] {
	const arr: [string, T][] = []
	for (const key of Object.keys(ht)) {
		arr.push([key, ht[key]])
	}
	return arr
}

export function HashTabletoArray<T>(ht: HashTable<T>): T[] {
	const arr: T[] = []
	for (const key of Object.keys(ht)) {
		arr.push(ht[key])
	}
	return arr
}

export function getRandomPosition(pivot: number, leeway: number) {
	return (Math.random() * leeway * 2) - leeway + pivot
}

export function undefinedToNull(d: any) {
	if (d == undefined) return null
	return d
}

export function isUndefOrNull(d: any) {
	return (d == undefined || d == null)
}

export function undefOrNullDefault<T>(value: any, replacement: T): T {
	// if (value == undefined || value == null)
	// 	return replacement
	// else
	// 	return value
	return defaultValue<T>(value, [null, undefined], replacement)
}

export function defaultValue<T>(value: any, invalids: any[], replacement: T): T {
	if (invalids.some(x => x == value))
		return replacement
	else
		return value
}
