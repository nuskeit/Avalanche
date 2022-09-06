import * as g from "../../general"

export interface I_Response<T> {
	successful: boolean,
	httpStatus: string,
	error: g.domain.Nullable<{ number: number, message: string }>,
	data: T
}

export interface I_RepoConnector {
	/**
	 * GET: Fetches a record or set of resources from the server. success: 200, failure: 404
	*/
	get<P>(data: P): I_Response<P>

	/**
	 * POST: Creates a new set of resources or a resource. success: 201, failure: 404, 409
	*/
	post<P>(data: P): I_Response<P>

	/**
	 * PATCH: Modifies the given record. success: 200, failure: 204 404
	*/
	patch<P>(data: P): I_Response<P>

	/**
	 * PUT Updates or replaces the given record. success: 200, failure: 204 404
	*/
	put<P>(data: P): I_Response<P>

	/**
	 * DELETE Deletes the given resource. success: 200, failure: 404
	*/
	delete<P>(data: P): I_Response<P>

	/**
	 * OPTIONS Fetches all available REST operations. success: 200
	*/
	options<P>(data: P): I_Response<P>

}

