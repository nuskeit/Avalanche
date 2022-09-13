export interface I_Presenter<T> {

	/**
	 * proxies: Collection of proxy functions that work as accessors to elements that
	 * may change externally in the outter components. ie: props, computed functions, memos, reactive objects, etc.
	*/
	readonly proxies: {} | undefined
	// It seems redundant, albeit necessary for reactivity interceptors of some modern FW
	// sucha as "Vue.js". For "React.js" and other imperative-reactivity FW, this is
	// transparent, as they don't mutate the state.  

	/**
	 * Delegates for GUI specifics' IOC.
	 * All functions that neet to be executed in the component environment.
	*/
	readonly delegates: {} | undefined

	/**
	 * Handler Methods to be invoked directly from the for GUI's Template.
	 * This is the bridge between browser (Events Args, DOM Refs, ...)
	 * and Application objects, that always must go through the Presenter.
	*/
	readonly eventsHandler: {} | undefined
}
