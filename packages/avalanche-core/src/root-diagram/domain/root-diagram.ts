import {
	Diagram, I_Diagram, ClassEntity, I_Element,
	MethodField, Parameter, PropertyField, TypeDef,
	InterfaceEntity, ElementsStore, DataType, DiagramType,
	ParamDirection, ParamValRef, RelationshipType,
	RelationsStore, ElementsRelationship, NumericRange,
	I_Repository, Nullable, GlobalKey
} from '../..'
import { I_Storable, Storable } from '../..'

// RootDiagram
export interface I_RootDiagram {
	readonly key: string
	name: string
	diagrams: I_Diagram[]
	elementsStore: ElementsStore
	relationshipsStore: RelationsStore

	addDiagram(p: I_Diagram): void
}

export class RootDiagram extends Storable<I_RootDiagram> implements I_RootDiagram, I_Storable {
	readonly key: string
	name: string
	diagrams: I_Diagram[]
	elementsStore: ElementsStore
	relationshipsStore: RelationsStore

	constructor(repository: I_Repository<I_RootDiagram>, key: Nullable<string> = null) {
		super(repository)
		this.name = "New Root Diagram"
		this.diagrams = []
		this.elementsStore = new ElementsStore()
		this.relationshipsStore = new RelationsStore()
		if (key == null) {
			this.key = GlobalKey.getNewGlobalKey()
		} else {
			this.key = key
//			this.getDataAsync()
		}
	}

	async getDataAsync(): Promise<void> {
		await this.repository.getDataAsync(this.key)
	}


	prefill() {

		// Temporary: prefill model to test
		if (true) {
			/*
			const componentsDiagram: Diagram = new Diagram("Creation of new diagrams", DiagramType.Component, this.elementsStore, this.relationshipsStore)
			this.addDiagram(componentsDiagram)
	
			const p1e1: I_Element = new ComponentEntity()
			const p1e2: I_Element = new ComponentEntity()
			const p1e3: I_Element = new ComponentEntity()
			p1e1.name = "RootDiagramUI"
			p1e2.name = "DiagramUI"
			p1e3.name = "ElementUI"
	
			p1e1.fields.push(new PropertyField("Prop 1", new TypeDef(DataType.string)))
			p1e1.fields.push(new PropertyField("Prop 2", new TypeDef(DataType.string)))
			p1e1.fields.push(new PropertyField("Prop 3", new TypeDef(DataType.string)))
	
			p1e2.fields.push(new PropertyField("Prop 1", new TypeDef(DataType.string)))
			p1e2.fields.push(new PropertyField("Prop 2", new TypeDef(DataType.string)))
			p1e2.fields.push(new PropertyField("Prop 3", new TypeDef(DataType.string)))
	
			p1e3.fields.push(new PropertyField("Prop 1", new TypeDef(DataType.string)))
			p1e3.fields.push(new PropertyField("Prop 2", new TypeDef(DataType.string)))
			p1e3.fields.push(new PropertyField("Prop 3", new TypeDef(DataType.string)))
			p1e3.fields.push(new PropertyField("Prop 4", new TypeDef(DataType.string)))
	
			componentsDiagram.createElement(p1e1, 100, 100)
			componentsDiagram.createElement(p1e2, 400, 110)
			componentsDiagram.createElement(p1e3, 700, 100)
	
	*/




			const diagram2: Diagram = new Diagram("General TEST Diagram", DiagramType.Class, this.elementsStore, this.relationshipsStore)
			this.addDiagram(diagram2)

			const vechicleClass: I_Element = new ClassEntity()
			const p2child2: I_Element = new ClassEntity()
			const p2e3: I_Element = new InterfaceEntity()
			const p2colorClass: I_Element = new ClassEntity()
			const p2car5: I_Element = new ClassEntity()
			const p2bus6: I_Element = new ClassEntity()
			const p2byke7: I_Element = new ClassEntity()

			p2colorClass.name = "Color"
			p2colorClass.fields.push(new PropertyField("r", new TypeDef(DataType.string)))
			p2colorClass.fields.push(new PropertyField("g", new TypeDef(DataType.string)))
			p2colorClass.fields.push(new PropertyField("b", new TypeDef(DataType.string)))
			p2colorClass.fields.push(new PropertyField("a", new TypeDef(DataType.string)))

			vechicleClass.name = "Vehicle"
			vechicleClass.fields.push(new PropertyField("id", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("name", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("run", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("park", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("BodyColor", new TypeDef(DataType.string, p2colorClass)))

			p2child2.name = "LandVehicle"
			p2child2.fields.push(new PropertyField("wheels", new TypeDef(DataType.string)))
			p2child2.fields.push(new PropertyField("landSpeed", new TypeDef(DataType.string)))

			p2e3.name = "I_Generic"
			p2e3.fields.push(new PropertyField("id", new TypeDef(DataType.string)))
			p2e3.fields.push(new PropertyField("name", new TypeDef(DataType.string)))

			p2car5.name = "Car"
			p2car5.fields.push(new PropertyField("Brand", new TypeDef(DataType.string)))
			p2car5.fields.push(new PropertyField("Name", new TypeDef(DataType.string)))
			p2car5.fields.push(new PropertyField("start", new TypeDef(DataType.string)))
			p2car5.fields.push(new PropertyField("RoofColor", new TypeDef(DataType.string, p2colorClass)))

			p2bus6.name = "Bus"
			p2bus6.fields.push(new PropertyField("Brand", new TypeDef(DataType.string)))
			p2bus6.fields.push(new PropertyField("Seats", new TypeDef(DataType.string)))
			p2bus6.fields.push(new PropertyField("start", new TypeDef(DataType.string)))
			p2bus6.fields.push(new PropertyField("stop", new TypeDef(DataType.string)))

			p2byke7.name = "Bike"
			p2byke7.fields.push(new PropertyField("Brand", new TypeDef(DataType.string)))
			p2byke7.fields.push(new PropertyField("Size", new TypeDef(DataType.string)))
			p2byke7.fields.push(new PropertyField("Tool Kit", new TypeDef(DataType.string)))
			p2byke7.fields.push(new PropertyField("Willy", new TypeDef(DataType.string)))
			p2byke7.fields.push(new PropertyField("Brake", new TypeDef(DataType.string)))





			diagram2.createElement(vechicleClass, -200, 10)
			diagram2.createElement(p2child2, 100, 200)
			diagram2.createElement(p2e3, 550, -100)
			diagram2.createElement(p2colorClass, 100, 400)
			diagram2.createElement(p2car5, 550, 400)
			diagram2.createElement(p2bus6, 750, 400)
			diagram2.createElement(p2byke7, 950, 400)

			/*
						componentsDiagram.addElement(p2child2, 200, 300)
		    
		    
						//Block
		    
						const BlockDiagram: Diagram = new Diagram("Sketch", DiagramType.Block, this.elementsStore, this.relationshipsStore)
						this.addDiagram(BlockDiagram)
		    
						const pBlocke1: I_Element = new BlockEntity()
						const pBlocke2: I_Element = new BlockEntity()
						const pBlocke3: I_Element = new BlockEntity()
						const pBlocke4: I_Element = new BlockEntity()
		    
						pBlocke1.name = "Block 1"
						pBlocke2.name = "Block 2"
						pBlocke3.name = "Block 3"
						pBlocke4.name = "Block 4"
		    
						pBlocke1.fields.push(new PropertyField("Test 1", new TypeDef(DataType.string)))
						pBlocke1.fields.push(new PropertyField("Test 2", new TypeDef(DataType.string)))
						pBlocke1.fields.push(new PropertyField("Test 3", new TypeDef(DataType.string)))
						pBlocke1.fields.push(new PropertyField("Test 4", new TypeDef(DataType.string)))
		    
						pBlocke2.fields.push(new PropertyField("Test 1", new TypeDef(DataType.string)))
						pBlocke2.fields.push(new PropertyField("Test 2", new TypeDef(DataType.string)))
						pBlocke2.fields.push(new PropertyField("Test 3", new TypeDef(DataType.string)))
		    
						pBlocke3.fields.push(new PropertyField("Test 1", new TypeDef(DataType.string)))
						pBlocke3.fields.push(new PropertyField("Test 2", new TypeDef(DataType.string)))
		    
						pBlocke4.fields.push(new PropertyField("Test 1", new TypeDef(DataType.string)))
						pBlocke4.fields.push(new PropertyField("Test 2", new TypeDef(DataType.string)))
		    
						BlockDiagram.createElement(pBlocke1, 100, 100)
						BlockDiagram.createElement(pBlocke2, 300)
						BlockDiagram.createElement(pBlocke3, 500)
						BlockDiagram.createElement(pBlocke4, 700, 200)
		    
		    
			*/

			// Relations
			this.relationshipsStore.addRelation(new ElementsRelationship(p2child2.key, vechicleClass.key, 'INHER', RelationshipType.Inheritance, new NumericRange(1, 1), new NumericRange(1, 1)))
			this.relationshipsStore.addRelation(new ElementsRelationship(p2child2.key, p2e3.key, 'IMPL', RelationshipType.Implements, new NumericRange(1, 1), new NumericRange(1, 1)))
			this.relationshipsStore.addRelation(new ElementsRelationship(p2child2.key, p2colorClass.key, 'USE', RelationshipType.Use, new NumericRange(1, 1), new NumericRange(1, 1)))
			this.relationshipsStore.addRelation(new ElementsRelationship(p2car5.key, p2child2.key, 'INHER', RelationshipType.Inheritance, new NumericRange(1, 1), new NumericRange(1, 1)))
			this.relationshipsStore.addRelation(new ElementsRelationship(p2bus6.key, p2child2.key, 'INHER', RelationshipType.Inheritance, new NumericRange(1, 1), new NumericRange(1, 1)))
			this.relationshipsStore.addRelation(new ElementsRelationship(p2byke7.key, p2child2.key, 'INHER', RelationshipType.Inheritance, new NumericRange(1, 1), new NumericRange(1, 1)))
			this.relationshipsStore.addRelation(new ElementsRelationship(p2byke7.key, p2e3.key, 'IMPLE', RelationshipType.Implements, new NumericRange(1, 1), new NumericRange(1, 1)))

			//          this.relationshipsStore.addRelation(new ElementsRelationship(p1e1.key, p2child2.key, 'DASOC', RelationshipType.DirectedAssociation, 1, 1))

		}

		// /Temporary: prefill model to test

	}


	minPrefill() {

		// Temporary: prefill model to test
		if (true) {

			const diagram2: Diagram = new Diagram("General TEST Diagram", DiagramType.Class, this.elementsStore, this.relationshipsStore)
			this.addDiagram(diagram2)

			const vechicleClass: I_Element = new ClassEntity()
			const p2colorClass: I_Element = new ClassEntity()
			const p2car5: I_Element = new ClassEntity()

			p2colorClass.name = "Color"
			p2colorClass.fields.push(new PropertyField("r", new TypeDef(DataType.string)))
			p2colorClass.fields.push(new PropertyField("g", new TypeDef(DataType.string)))
			p2colorClass.fields.push(new PropertyField("b", new TypeDef(DataType.string)))
			p2colorClass.fields.push(new PropertyField("a", new TypeDef(DataType.string)))

			vechicleClass.name = "Vehicle"
			vechicleClass.fields.push(new PropertyField("id", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("name", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("run", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("park", new TypeDef(DataType.string)))
			vechicleClass.fields.push(new PropertyField("BodyColor", new TypeDef(DataType.string, p2colorClass)))

			p2car5.name = "Car"
			p2car5.fields.push(new MethodField("Drive", new TypeDef(DataType.boolean), [
				new Parameter("speedLimit", ParamDirection.In, ParamValRef.Val, new TypeDef(DataType.string)),
				new Parameter("overuleSpeedLimit", ParamDirection.In, ParamValRef.Val, new TypeDef(DataType.boolean))
			]))
			p2car5.fields.push(new PropertyField("Brand", new TypeDef(DataType.string)))
			p2car5.fields.push(new PropertyField("Name", new TypeDef(DataType.string)))
			p2car5.fields.push(new PropertyField("start", new TypeDef(DataType.string)))
			p2car5.fields.push(new PropertyField("RoofColor", new TypeDef(DataType.string, p2colorClass)))


			diagram2.createElement(vechicleClass, 400, 10)
			diagram2.createElement(p2colorClass, 100, 400)
			diagram2.createElement(p2car5, 750, 450)

			// Relations
			this.relationshipsStore.addRelation(new ElementsRelationship(p2car5.key, vechicleClass.key, 'INHER', RelationshipType.Inheritance, new NumericRange(1, 1), new NumericRange(-Infinity, Infinity)))

		}

		// /Temporary: prefill model to test

	}



	public initialize(): void {
		//      this._dto.diagrams = []
	}

	public addDiagram(p: I_Diagram): void {
		this.diagrams.push(p)
	}

	toJSON() {
		return {
			...this,
			__type: "RootDiagram"
		}
	}
}
