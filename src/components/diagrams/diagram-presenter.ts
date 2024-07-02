import { Diagram } from '../../core/diagram/application'
import { I_Element } from '../../core/element/domain'
import { I_Grid } from '../../core/diagram/grid/domain'
import { I_Draggable } from '../../core/drag/domain'
import { AppFactory } from '../../core/factories/app-factory/application'
import { DraggableObjectType, isUndefOrNull, I_Vector, Nullable, RelationshipType, travelStep } from '../../core/general/domain'
import { DraggableHelper, I_Presenter, Throttle } from '../../core/general/presenter'
import { Grid } from './grid-presenter'
import { I_ElementsRelationship } from '../../core/relationships/domain'
const t = new Throttle()

export class DiagramPresenter implements I_Presenter<Diagram> {

	constructor(proxies: Proxies,
		diagramSvgAccessor: Function,
		diagramSvgPointAccessor: Function
	) {
		this.proxies = proxies
		// this.diagramProxy.zoom.doZoom(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.draggableHelper = new DraggableHelper(this.toLocalVector)
		this.grid = new Grid(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.delegates = {
			diagramSvgAccessor,
			diagramSvgPointAccessor
		}
		this.zoomPercentage = `${this.diagramProxy.zoom.percentage.toString()}%`
	}

	selectedDraggable: I_Draggable<I_Element | I_Vector> | undefined
	// draggableElement: I_Draggable<I_Element> | undefined
	// draggableViewBox: I_Draggable<I_Vector> | undefined
	draggingDynamicClassName: string = ""

	dragType: DraggableObjectType | undefined

	keyboardNavFlag: boolean = false

	draggableHelper: any

	grid: I_Grid

	zoomPercentage: string = ""


	_prevEditElementKey: Nullable<string> = null
	_editElement: Nullable<I_Element> = null
	get editElement(): Nullable<I_Element> { return this._editElement }
	set editElement(value: Nullable<I_Element>) {
		this._editElement = value
		if (value == null && this._prevEditElementKey != null) {
			this.diagramProxy.removeRelationshipsByElement(this._prevEditElementKey)
			this._prevEditElementKey = null
			/*DEBUG*/ console.log('11111111111111111111111111111111111111111');
		} else if (value != null && this._prevEditElementKey != value.key) {
			this.diagramProxy.removeRelationshipsByTarget(this._prevEditElementKey || "")
			/*DEBUG*/ console.log('dddddddd', this.diagramProxy.key, value.key);
			const r = AppFactory.getSingleton().createElementsRelationship(this.diagramProxy.key, value.key, this.diagramProxy.key, value.key, "TEST", RelationshipType.Association)
			this.diagramProxy.addRelationship(r)
			this._prevEditElementKey = value.key
			/*DEBUG*/ console.log('2222222222222222222222222222222222222222');
		}
		/*DEBUG*/ console.log('EDIT ELEMENT');
		// this.diagramProxy.detectRelationshipsChanges()
		//  this.diagramProxy.detectRelationshipsChanges()
	}

	selectedElement: Nullable<I_Element> = null

	get elementEditorVisible(): boolean { return this.editElement != null }
	get diagramEditorVisible(): boolean { return this.editElement == null && this.selectedRelationshipKey == undefined }
	get relationshipEditorVisible(): boolean { return this.selectedRelationshipKey != undefined }

	get originPointerVisible(): boolean {
		//true when origin cross is outside the viewport
		if (this.diagramProxy.viewBox.x > 0 || this.diagramProxy.viewBox.x < -this.diagramProxy.viewPort.width / this.diagramProxy.zoom.factor ||
			this.diagramProxy.viewBox.y > 0 || this.diagramProxy.viewBox.y < -this.diagramProxy.viewPort.height / this.diagramProxy.zoom.factor)
			return true
		else
			return false
	}

	selectedRelationshipKey?: string
	get relationships(): I_ElementsRelationship[] { return this.diagramProxy.getRelationships() }
	get selectedRelationship(): I_ElementsRelationship | undefined { return this.relationships.find(r => r.key == this.selectedRelationshipKey) }


	toLocalVector = (clientX: number, clientY: number): I_Vector => {
		this.delegates.diagramSvgPointAccessor().x = clientX; this.delegates.diagramSvgPointAccessor().y = clientY;
		return this.delegates.diagramSvgPointAccessor().matrixTransform(this.delegates.diagramSvgAccessor().getScreenCTM().inverse());
	}

	detectDraggingMode(e: PointerEvent) {
		if (this.dragType == DraggableObjectType.viewBox) {
			let loc = this.toLocalVector(e.clientX, e.clientY)
			this.selectedDraggable = AppFactory.getSingleton().createDraggable<I_Vector>(this.diagramProxy.viewBox, loc)
		} else if (this.dragType == DraggableObjectType.element)
			this.draggableHelper.StartDrag(this.selectedDraggable)

		this.presenterProxy.draggingDynamicClassName = "dragging"
	}


	startDraggingElement(se: I_Draggable<I_Element>, mouseLocation: I_Vector) {
		this.dragType = DraggableObjectType.element
		this.selectedDraggable = se
		this.draggableHelper.StartDrag(this.selectedDraggable, mouseLocation)
	}

	updateDrag(e: PointerEvent) {
		this.keyboardNavFlag = false
		if (this.dragType == DraggableObjectType.element) {
			t.throttle(() => {
				if (this.selectedDraggable == undefined) return
				this.draggableHelper.UpdateDrag(this.selectedDraggable, e.clientX, e.clientY)
			}, 18)
		} else if (this.dragType == DraggableObjectType.viewBox) {
			t.throttle(() => {
				if (isUndefOrNull(this.selectedDraggable)) return
				this.draggableHelper.UpdateDragViewBox(this.selectedDraggable, e.clientX, e.clientY)
				this.grid.drawGrid()
			}, 30)
		}
	}


	UpdateDragViewBox(se: Nullable<I_Draggable<I_Vector>>, clientX: number, clientY: number) {
		if (se != null) {
			let loc = this.toLocalVector(clientX, clientY)
			se.element.x -= (loc.x - se.location.x)
			se.element.y -= (loc.y - se.location.y)
		}
	}


	cancelDrag() {
		this.selectedDraggable = undefined
		this.presenterProxy.draggingDynamicClassName = ""
		this.draggableHelper.EndDrag()
	}

	screenPadNavigation(v: I_Vector) {
		this.grid.drawGrid()

		const navVector: I_Vector = AppFactory.getSingleton().createVector(v.x, v.y)
		this.travel(navVector.x, navVector.y)
	}

	keyboardInteraction(key: string) {
		const moveVec: I_Vector = AppFactory.getSingleton().createVector(0, 0)

		// Zoom funtionality
		if (key == "+") {
			this.zoomIn()
		} else if (key == "-") {
			this.zoomOut()
		} else if (key == "0") {
			this.zoomReset()
		}

		if (key == "Delete") {
			if (this.selectedElement) {
				this.diagramProxy.removeElement(this.selectedElement.key)
			}
		}

		if (["ArrowLeft", "a"].includes(key)) {
			moveVec.x = -3
		}
		else if (["ArrowRight", "d"].includes(key)) {
			moveVec.x = 3
		}
		if (["ArrowUp", "w"].includes(key)) {
			moveVec.y = -3
		}
		else if (["ArrowDown", "s"].includes(key)) {
			moveVec.y = 3
		}

		if ([" ", "Clear"].includes(key)) {
			this.travelToCenter()
		} else {
			const travelFactor = 15
			moveVec.x *= travelFactor
			moveVec.y *= travelFactor
			this.travel(moveVec.x, moveVec.y)
		}

		this.grid.drawGrid()

	}

	quitKeyboardInteraction() {
		this.keyboardNavFlag = false
	}

	travel(factorX: number, factorY: number): void {
		this.diagramProxy.viewBox.x += factorX
		this.diagramProxy.viewBox.y += factorY
	}

	travelTo(v: I_Vector): void {
		this.diagramProxy.viewBox.x = v.x
		this.diagramProxy.viewBox.y = v.y
	}

	travelToOrigin(): void {
		this.travelTo({ x: -this.diagramProxy.viewBox.width / 2, y: -this.diagramProxy.viewBox.height / 2 })
	}

	travelToCenter(): void {
		let minW = Number.MAX_VALUE, maxW = -Number.MAX_VALUE
		let minH = Number.MAX_VALUE, maxH = -Number.MAX_VALUE

		for (const e in this.diagramProxy.elements) {
			minW = Math.min(minW, this.diagramProxy.elements[e].location.x)
			maxW = Math.max(maxW, this.diagramProxy.elements[e].location.x + this.diagramProxy.elements[e].size.width)
			minH = Math.min(minH, this.diagramProxy.elements[e].location.y)
			maxH = Math.max(maxH, this.diagramProxy.elements[e].location.y + this.diagramProxy.elements[e].heightAuto)
		} 0
		const midContent = {
			x: (minW + maxW) / 2,
			y: (minH + maxH) / 2
		}
		const midViewBox = {
			x: this.diagramProxy.viewBox.width / 2,
			y: this.diagramProxy.viewBox.height / 2
		}

		this.travelTo({ x: midContent.x - midViewBox.x, y: midContent.y - midViewBox.y })
	}

	zoomIn() {
		this.diagramProxy.zoom.zoomIn(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.presenterProxy.zoomPercentage = `${this.diagramProxy.zoom.percentage.toString()}%`
	}

	zoomOut() {
		this.diagramProxy.zoom.zoomOut(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.presenterProxy.zoomPercentage = `${this.diagramProxy.zoom.percentage.toString()}%`
	}

	zoomReset() {
		this.diagramProxy.zoom.zoomReset(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.presenterProxy.zoomPercentage = `${this.diagramProxy.zoom.percentage.toString()}%`
	}

	zoomAdjust() {
		this.diagramProxy.zoom.doZoom(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.presenterProxy.zoomPercentage = `${this.diagramProxy.zoom.percentage.toString()}%`
	}

	selectRelationship(key: string) {
		this.presenterProxy.selectedElement = null
		this.presenterProxy.editElement = null
		this.presenterProxy.selectedRelationshipKey = key
	}

	unselectRelationship() {
		this.presenterProxy.selectedRelationshipKey = undefined
	}


	proxies: Proxies
	get presenterProxy(): DiagramPresenter { return this.proxies.presenterProxy() }
	get diagramProxy(): Diagram { return this.proxies.diagramProxy() }

	// Delegates
	delegates: {
		/**
		 *diagram's SVG's DOM element ref accesor
		*/
		diagramSvgAccessor: Function

		/**
		 *diagram's svgPoint's DOM element ref accesor
		*/
		diagramSvgPointAccessor: Function
	}


	thro = false
	delta = { x: 0, y: 0 }
	fn(): boolean {
		this.presenterProxy.screenPadNavigation(this.delta)
		this.delta.x = 0.001
		this.delta.y = 0.001
		return false
	}


	_zoomDone = false
	// UI events handler
	eventsHandler = {

		wheel: (e: WheelEvent) => {
			this.delta.x += e.deltaX == 0 ? 0.001 : e.deltaX / 5
			this.delta.y += e.deltaY == 0 ? 0.001 : e.deltaY / 5
			if (this.thro) return
			requestAnimationFrame(() => this.thro = this.fn())
			this.thro = true

			// const scrollSpeed = 2
			// if (e.ctrlKey) {
			// 	if (e.deltaY > 0) {
			// 		this.presenterProxy.zoomOut()
			// 	}
			// 	else if (e.deltaY < 0) {
			// 		this.presenterProxy.zoomIn()
			// 	}
			// } else {
			// 	if (e.shiftKey) {
			// 		if (e.deltaY > 0) {
			// 			this.presenterProxy.screenPadNavigation({ x: scrollSpeed, y: 0 })
			// 		}
			// 		else if (e.deltaY < 0) {
			// 			this.presenterProxy.screenPadNavigation({ x: -scrollSpeed, y: 0 })
			// 		}
			// 	} else {
			// 		this.presenterProxy.screenPadNavigation({ x: e.deltaX == 0 ? 0.001 : e.deltaX / 10, y: e.deltaY == 0.001 ? 1 : e.deltaY / 10 })
			// 		this.presenterProxy.screenPadNavigation({ x: e.deltaX == 0 ? 0.001 : e.deltaX / 10, y: e.deltaY == 0.001 ? 1 : e.deltaY / 10 })
			// 		// this.presenterProxy.screenPadNavigation({ x: e.deltaX == 0 ? 1 : e.deltaX / 10, y: e.deltaY == 0 ? 1 : e.deltaY / 10 })
			// 		// this.presenterProxy.screenPadNavigation({ x: e.deltaX == 0 ? 1 : e.deltaX / 10, y: e.deltaY == 0 ? 1 : e.deltaY / 10 })
			// 		// if (e.deltaY > 0) {
			// 		// 	this.presenterProxy.screenPadNavigation({ x: e.deltaX, y: -scrollSpeed })
			// 		// }
			// 		// else if (e.deltaY < 0) {
			// 		// 	this.presenterProxy.screenPadNavigation({ x: e.deltaX, y: scrollSpeed })
			// 		// }
			// 	}
			// }
		},

		selectRelationship: (key: string) => {
			this.selectRelationship(key)
		},

		deleteElement: (element: I_Element) => {
			this.diagramProxy.removeElement(element.key)
			this.presenterProxy.selectedElement = null
		},

		diagramPointerDownHandler: (e: PointerEvent) => {
			this.presenterProxy.selectedElement = null
			this.presenterProxy.editElement = null
			this.presenterProxy.selectedRelationshipKey = undefined
			// this.unselectRelationship()
			this.dragType = DraggableObjectType.viewBox
			this.detectDraggingMode(e)
		},

		startDraggingElementHandler: (se: I_Draggable<I_Element>, mouseLocation: I_Vector) => {
			this.startDraggingElement(se, mouseLocation)
		},

		selectElementHandler: (element: Nullable<I_Element>) => {
			this.presenterProxy.selectedElement = element
			this.presenterProxy.editElement = element
			this.presenterProxy.selectedRelationshipKey = undefined
		},

		svgResizeHandler: () => {
			requestAnimationFrame(() => {
				const iniW = this.delegates.diagramSvgAccessor().width.animVal.value
				const iniH = this.delegates.diagramSvgAccessor().height.animVal.value
				this.diagramProxy.viewPort.width = iniW
				this.diagramProxy.viewPort.height = iniH
				const w = iniW / this.diagramProxy.zoom.factor
				const h = iniH / this.diagramProxy.zoom.factor
				this.diagramProxy.viewBox.width = w
				this.diagramProxy.viewBox.height = h
			})

		},

		cancelDragHandler: () => {
			this.cancelDrag()
		},

		updateDragHandler: (e: PointerEvent) => {
			this.updateDrag(e)
		},

		screenPadNavigationHandler: (v: I_Vector) => {
			let newV = { x: v.x * travelStep, y: v.y * travelStep }
			this.screenPadNavigation(newV)
		},

		stopNavigatingHandler: () => {
			this.quitKeyboardInteraction()
		},

		zoomIn: () => {
			this.zoomIn()
		},

		zoomOut: () => {
			this.zoomOut()
		},

		handleKeyDown: (e: KeyboardEvent) => {
			const filter = ["+", "-",
				"ArrowLeft", "a", "ArrowRight", "d", "ArrowUp", "w", "ArrowDown", "s",
				" ", "0",
				"Clear", "Delete"]
			if (!((e.ctrlKey && e.key == "F5") || (e.ctrlKey && e.key == "0") || (e.ctrlKey && e.shiftKey && e.key.toLowerCase() == "i") || e.key == "F5" || e.key == "esc"))
				e.preventDefault()
			if (!e.ctrlKey && !e.altKey && !e.shiftKey && filter.includes(e.key)) {
				// e.preventDefault()
				this.keyboardInteraction(e.key)
			}
		}
	}


	cssValues = {
		"$component-color1": "rgb(130, 130, 110)",
		"$class-color1": "#123",
		"$generic-color1": "rgb(120, 140, 150)"
	}



	svgStyle = `
	
	svg.diagram {
		transform-origin: center center;
		animation: object-shake .2s linear 0s 1;
		animation-timing-function: steps(1, end);
	
		shape-rendering: optimizeQuality;
	}
	svg.diagram .diagram-shake {
		animation: object-shake .2s linear 0s 1;
		animation-timing-function: steps(1, end);
	}
	
	
	
	svg.diagram-component {
		background-color: ${this.cssValues["$component-color1"]};
	}
	
	
	
	svg.diagram-class {
		background-color: ${this.cssValues["$class-color1"]};
		fill: #ddd;
	}
	
	
	svg.diagram-generic {
		background-color: ${this.cssValues["$generic-color1"]};
	}
	





	.element-template {
		fill: none;
		overflow: hidden;
		filter: drop-shadow(4px 4px 1.5px rgb(0 0 0 / .5));
	}

	.element-template text {
		fill: white;
		font-size: .6rem;
	}
	
	.element-template-header-body {
		fill: #222;
		stroke: none;
		cursor: pointer;
	}

	.element-template-header-text {
		cursor: pointer;
		font-size: 20rem;
	}

	.element-type {
		font-size: .6rem;
	}

	.element-template-body {
		stroke-width: 1;
		stroke: #aaa;
		fill: #7778;
	}

	.element-template-inner-body {
		stroke-width: 1;
		stroke: #333;
		fill: #000, 1);
	}


	.Generic {
		fill: #3373;
	}

	.Component {
		fill: #a5a3;
	}

	.Class {
		fill: #f753;
	}

	.Interface {
		fill: #cfa3;
		stroke-dasharray: 4;
		stroke-width: .5;
		stroke: #000;
	}

	.header-Interface {
		fill: #0003;
	}

	.Enum {
		fill: #7773;
	}
	`

}


type Proxies = {
	presenterProxy(): DiagramPresenter
	diagramProxy(): Diagram
}
