import { provide, reactive } from 'vue';

import { AppFactory } from '../../core/factories/app-factory/application';

// Use symbol as unique identifier.
export const rootDiagramSymbol = Symbol('rootDiagramSymbol');

export default {
	setup() {

		const rootDiagram = reactive(AppFactory.getSingleton().createRootDiagram())

		provide(rootDiagramSymbol, rootDiagram);

	}
};

