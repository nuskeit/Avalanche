import {Vector} from '../src/core/general/domain/generic-types'


describe('test module app', () => {
	test('Vector initialized', () => {
		const vec = new Vector(0, 0)
		expect(vec.x).toBe(0)
		expect(vec.y).toBe(0)
	})
})