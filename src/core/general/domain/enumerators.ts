export const DiagramType = {
	Component: "Component",
	Generic: "Generic",
	Class: "Class"
} as const
export type DiagramType = typeof DiagramType[keyof typeof DiagramType]

export const ElementType = {
	Component: "Component",
	Generic: "Generic",
	Class: "Class",
	Interface: "Interface",
	Enum: "Enum",
	ExternalDependency: "ExternalDependency"
} as const
export type ElementType = typeof ElementType[keyof typeof ElementType]


export const RelationshipType = {
	Association: "Association",
	DirectedAssociation: "DirectedAssociation",
	Aggregation: "Aggregation",
	Composition: "Composition",
	Inheritance: "Inheritance",
	Implements: "Implements",
	Use: "Use",
} as const
export type RelationshipType = typeof RelationshipType[keyof typeof RelationshipType]


export const FieldType = {
	Property: "Property",
	Event: "Event",
	Method: "Method"
} as const
export type FieldType = typeof FieldType[keyof typeof FieldType]


export const DataType = {
	void: "void",
	number: "number",
	bit: "bit",
	byte: "byte",
	int: "int",
	int32: "int32",
	int64: "int64",
	decimal: "decimal",
	float: "float",
	double: "double",
	string: "string",
	boolean: "boolean",
	object: "object",
	blob: "blob",
} as const
export type DataType = typeof DataType[keyof typeof DataType]


export const ParamDirection = {
	In: "In",
	Out: "Out",
	In_Out: "In_Out",
} as const
export type ParamDirection = typeof ParamDirection[keyof typeof ParamDirection]


export const ParamValRef = {
	Val: "Val",
	Ref: "Ref",
} as const
export type ParamValRef = typeof ParamValRef[keyof typeof ParamValRef]



export const DraggableObjectType = {
	none: "none",
	element: "element",
	viewBox: "viewBox"
} as const

export type DraggableObjectType = typeof DraggableObjectType[keyof typeof DraggableObjectType]


export const Scope = {
	Public: 'Public',
	Package: 'Package',
	Protected: 'Protected',
	Private: 'Private'
} as const
export type Scope = typeof Scope[keyof typeof Scope]

