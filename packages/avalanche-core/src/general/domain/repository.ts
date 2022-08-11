export interface I_Repository<T> {
	getDataAsync(key: string): Promise<T>
}
