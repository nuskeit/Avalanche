export {}
// import { defineStore } from "pinia"
// import {
//     RootDiagram_DTO, I_Diagram_DTO,
//     Diagram_DTO, Diagram,
//     I_Component_DTO,
//     Component_DTO,
//     DiagramType
// } from '../../domain/MegaDiagram'

// export const useMegaDiagramStore = defineStore("rootDiagram", {
//     state: () => ({
//         RootDiagram: new RootDiagram_DTO()
//     }),
//     getters: {
//         getDiagrams: (state) => {
//             state
//         }
//     },
//     actions: {
//         reset() {
//             //DO STUFF
//         },
//         addDiagram(diagram: I_Diagram_DTO) {
//             this.RootDiagram.diagrams.push(diagram)

//             // cartStore.$patch((state) => {
//             //     state.items.push({ name: 'shoes', quantity: 1 })
//             //     state.hasChanged = true
//             // })
//         },
//         addComponentToDiagram(diagramIndex: number, component: I_Component_DTO) {
//             component.y = 200
//             this.RootDiagram.diagrams[diagramIndex].components.push(component)
//         },
//         setDefaultStore(diagramId: number, name: string) {

//             const elem = new Component_DTO()
//             elem.id = 0
//             elem.name = 'Elem A'
//             elem.x = 10
//             elem.y = 10
//             elem.visible = true

//             const diagram = new Diagram_DTO()
//             diagram.id = diagramId
//             diagram.name = name
//             diagram.diagramType = DiagramType.Blocks
//             diagram.visible = true
//             diagram.components = [
//                 { id: 0, name: "Component A", x: 50, y: 50, visible: true },
//                 { id: 1, name: "Component D", x: 230, y: 50, visible: true },
//                 { id: 2, name: "Component C", x: 410, y: 50, visible: true }
//             ]

//             this.RootDiagram.diagrams.push(diagram)

//         }
//     }

//     // [
//     //     {
//     //         name: "Default diagram",
//     //         diagramType: DiagramType.Blocks,
//     //         visible: true,
//     //         components:   [
//     //                     {id: 0, name: "Component A", x: 10, y: 10},
//     //                     {id: 1, name: "Component D", x: 30, y: 20},
//     //                     {id: 2, name: "Component C", x: 50, y: 30}
//     //                     ]
//     //     }
//     // ]

// })

