export interface I_Presenter<T> {

	/**
	 * Callback proxy: must return proxy of current instance.
	 * It seems redundant albeit necessary for reactivity interceptors of some modern FW
	 * sucha as "Vue.js". For "React.js" and other imperative-reactivity FW, this is
	 * transparent, as they don't mutate the state.  
	*/
	proxy: Function

	/**
	 *  Object Model Representative/Reference (OMR)
	*/
	//readonly objectModelRef: T

	/**
	 *  Delegates for GUI specifics' IOC
	*/
	readonly delegates: {}

	/**
	 * Handler Methods to be invoked directly from the for GUI's Template.
	 * This is the bridge between browser objects (Events Args, DOM Refs, ...)
	 * and Presenter's and Application ones. No Template related object or data must
	 * go trough this bridge. 
	*/
	readonly eventsHandler: {}
}
