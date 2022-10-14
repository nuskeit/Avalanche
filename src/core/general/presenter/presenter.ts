export interface I_Presenter<T> {

	/**
	 * proxies: Collection of proxy functions that work as accessors to elements that
	 * may change externally in the outter components. ie: props, computed functions, memos, reactive objects, etc.
	*/
	readonly proxies: {} | undefined
	// It seems redundant, albeit necessary for reactivity interceptors of some modern FW
	// such as "Vue.js", which implements a native proxy. For "React.js" and other 
	// imperative-reactivity FW, this is transparent, as they don't mutate the state.
	// It also can be implemented with a facade object that executes a setState in corresponding setters.

	/**
	 * Delegates for GUI specifics' IOC.
	 * 1 - All functions that neet to be executed in the presentation component environment: in the UI script or in the template.
	 * 2 - All accessor functions to elements in the DOM
	*/
	readonly delegates: {} | undefined

	/**
	 * Handler Methods to be invoked directly from the for GUI's Template.
	 * This is the bridge between browser (Events Args, DOM Refs, ...)
	 * and Application objects, that always must go through the Presenter.
	*/
	readonly eventsHandler: {} | undefined
}
