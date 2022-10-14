export type Nullable<T> = T | null;

export interface I_Vector {
	x: number
	y: number
}

export type numberAuto = number | "auto"

export type Size = {
	width: numberAuto
	height: numberAuto
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