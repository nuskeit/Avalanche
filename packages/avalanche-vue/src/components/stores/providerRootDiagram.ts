import {
    provide,
    reactive
} from 'vue';

import { RootDiagram } from '../../../../avalanche-core';

// Use symbol as unique identifier.
export const rootDiagramSymbol = Symbol('rootDiagramSymbol');

export default {
    setup() {

        const rootDiagram = reactive(new RootDiagram())

        provide(rootDiagramSymbol, rootDiagram);

    }
};

