export const CreationType = {
	RootDiagram: "RootDiagram",
	Diagram: "Diagram",
} as const
export type CreationType = typeof CreationType[keyof typeof CreationType]
