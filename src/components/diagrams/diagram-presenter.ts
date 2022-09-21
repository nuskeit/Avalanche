import { I_Diagram } from '../../core/avalanche-app/root-diagram/diagram/domain'
import { I_Element } from '../../core/avalanche-app/root-diagram/diagram/element/domain'
import { I_Grid } from '../../core/avalanche-app/root-diagram/diagram/grid/domain'
import { I_Draggable } from '../../core/drag/domain'
import { AppFactory } from '../../core/factories/app-factory/application'
import { DraggableObjectType, I_Vector, Nullable, travelStep } from '../../core/general/domain'
import { DraggableHelper, I_Presenter, Throttle } from '../../core/general/presenter'
import { Grid } from './grid-presenter'
const t = new Throttle()

export class DiagramPresenter implements I_Presenter<I_Diagram> {

	draggableElement: I_Draggable<I_Element> | undefined
	draggableViewBox: I_Draggable<I_Vector> | undefined
	draggingDynamicClassName: string = ""

	dragType: DraggableObjectType | undefined

	interval: any
	keyboardNavFlag: boolean = false

	draggable: any

	grid: I_Grid

	zoomState = {
		factor: 10,
		level: 0,
		center: { x: 0, y: 0 }
	}



	_prevEditElementKey: Nullable<string> = null
	_editElement: Nullable<I_Element> = null
	get editElement(): Nullable<I_Element> { return this._editElement }
	set editElement(value: Nullable<I_Element>) {
		this._editElement = value
		if (value == null && this._prevEditElementKey != null) {
			this._prevEditElementKey = null
			this.diagramProxy.detectRelationshipsChanges()
		} else if (value != null && this._prevEditElementKey != value.key) {
			this._prevEditElementKey = value.key
			this.diagramProxy.detectRelationshipsChanges()
		}
	}

	selectedElement: Nullable<I_Element> = null

	get elementEditorVisible(): boolean { return this.editElement != null }



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




	constructor(proxies: Proxies,
		diagramSvgAccessor: Function,
		diagramSvgPointAccessor: Function
	) {
		this.proxies = proxies
		this.draggable = new DraggableHelper(this.toLocalVector)
		this.grid = new Grid(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.delegates = {
			diagramSvgAccessor,
			diagramSvgPointAccessor
		}
	}

	toLocalVector = (clientX: number, clientY: number): I_Vector => {
		this.delegates.diagramSvgPointAccessor().x = clientX; this.delegates.diagramSvgPointAccessor().y = clientY;
		return this.delegates.diagramSvgPointAccessor().matrixTransform(this.delegates.diagramSvgAccessor().getScreenCTM().inverse());
	}

	//navigationControlPosition: I_Vector = {x:0,y:0}


	get navigationControlPosition(): I_Vector {
		return { x: this.diagramProxy.viewBox.width - 210, y: 50 }
	}

	get diagramToolboxPosition(): I_Vector {
		return { x: this.diagramProxy.viewBox.width - 230, y: 270 }
	}

	detectDraggingMode(e: PointerEvent) {
		if (this.draggableElement == undefined) {
			let loc = this.toLocalVector(e.clientX, e.clientY)
			this.dragType = DraggableObjectType.viewBox
			this.draggableViewBox = AppFactory.getSingleton().createDraggable<I_Vector>(this.diagramProxy.viewBox,
				AppFactory.getSingleton().createDragger("draggableViewBox", loc, AppFactory.getSingleton().createVector(e.clientX, e.clientY)))
		} else
			this.draggable.StartDrag(this.draggableElement)

		this.draggingDynamicClassName = "dragging"
	}


	startDraggingElement(se: I_Draggable<I_Element>) {
		this.dragType = DraggableObjectType.element
		this.draggableElement = se
		this.draggable.StartDrag(this.draggableElement)
	}

	updateDrag(e: PointerEvent) {
		this.keyboardNavFlag = false
		if (this.dragType == DraggableObjectType.element) {
			t.throttle(() => {
				if (this.draggableElement == undefined) return
				this.draggable.UpdateDrag(this.draggableElement, e.clientX, e.clientY)
			}, 18)
		} else if (this.dragType == DraggableObjectType.viewBox) {
			t.throttle(() => {
				if (this.draggableViewBox == null) return
				this.UpdateDragViewBox(this.draggableViewBox, e.clientX, e.clientY)
				this.grid.drawGrid()
			}, 30)
		}
	}


	UpdateDragViewBox(se: Nullable<I_Draggable<I_Vector>>, clientX: number, clientY: number) {
		if (se != null) {
			let loc = this.toLocalVector(clientX, clientY)
			se.element.x -= (loc.x - se.dragger.location.x)
			se.element.y -= (loc.y - se.dragger.location.y)
		}
	}


	cancelDrag() {
		this.draggableElement = undefined
		this.draggableViewBox = undefined
		this.draggingDynamicClassName = ""
		this.draggable.EndDrag()
	}

	screenPadNavigation(v: I_Vector) {
		this.presenterProxy.keyboardNavFlag = true
		this.presenterProxy.interval = setInterval(
			() => {
				this.grid.drawGrid()

				if (!this.keyboardNavFlag) {
					clearInterval(this.interval)
					return
				}
				const navVector: I_Vector = AppFactory.getSingleton().createVector(20 * v.x, 20 * v.y)
				if (v.x === 0 && v.y === 0) { // center
					this.travelToOrigin()
				} else { // navigate
					this.travel(navVector.x, navVector.y)
				}
			}, 150)
	}

	keyboardInteraction(key: string) {
		const moveVec: I_Vector = AppFactory.getSingleton().createVector(0, 0)

		// if (key == "+") {
		// 	console.log('MAS');
		// 	this.zoom(-this.zoomFactor)
		// } else if (key == "-") {
		// 	this.zoom(this.zoomFactor)
		// }
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
			this.travelToOrigin()
		} else {
			const travelFactor = 15
			moveVec.x *= travelFactor
			moveVec.y *= travelFactor
			this.travel(moveVec.x, moveVec.y)
		}

		this.grid.drawGrid()

	}

	quitKeyboardInteraction() {
		clearInterval(this.interval)
		this.keyboardNavFlag = false
	}

	zoom(factor: number): void {
		this.presenterProxy.zoomState.level += factor
		// this.diagramProxy.viewBox.x -= factor
		// this.diagramProxy.viewBox.y -= factor
		// this.diagramProxy.viewBox.width += factor
		// this.diagramProxy.viewBox.height += factor
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

	updateViewportSize() {
		this.diagramProxy.viewPort.width = this.delegates.diagramSvgAccessor().width.animVal.value
		this.diagramProxy.viewPort.height = this.delegates.diagramSvgAccessor().height.animVal.value
		this.presenterProxy.navigationControlPosition.x = this.diagramProxy.viewPort.width - 20

	}


	proxies: Proxies

	get presenterProxy(): DiagramPresenter { return this.proxies.presenterProxy() }
	get diagramProxy(): I_Diagram { return this.proxies.diagramProxy() }


	// UI events handler
	eventsHandler = {
		diagramPointerDownHandler: (e: PointerEvent) => {
			this.presenterProxy.selectedElement = null
			this.presenterProxy.editElement = null
			this.detectDraggingMode(e)
		},

		startDraggingElementHandler: (se: I_Draggable<I_Element>) => {
			this.startDraggingElement(se)
		},

		selectElementHandler: (element: Nullable<I_Element>) => {
			this.presenterProxy.selectedElement = element
			this.presenterProxy.editElement = element
		},

		closeElementEditorHandler: () => {
			console.log('CLOSE EDITOR');
			this.presenterProxy.editElement = null
			this.presenterProxy.diagramProxy.relationships = { ...this.presenterProxy.diagramProxy.relationships }
		},

		updateElementHandler: (e: I_Element) => {
			console.log('UPDATE ELEMENT');
			this.diagramProxy.elements[e.key].element = e
		},

		cancelDragHandler: () => {
			this.cancelDrag()
		},

		updateDragHandler: (e: PointerEvent) => {
			this.presenterProxy.updateViewportSize()
			this.updateDrag(e)
		},

		screenPadNavigationHandler: (v: I_Vector) => {
			let newV = { x: v.x * travelStep, y: v.y * travelStep }
			this.screenPadNavigation(newV)
		},

		stopNavigatingHandler: () => {
			this.quitKeyboardInteraction()
		},

		handleKeyDown: (e: KeyboardEvent) => {
			// if (e.key == "+") {
			// 	console.log('MAS');
			// 	this.zoom(-this.zoomFactor)
			// } else if (e.key == "-") {
			// 	this.zoom(this.zoomFactor)
			// }

			if (!e.ctrlKey && !e.altKey && !e.shiftKey && ["+", "-", "ArrowLeft", "a", "ArrowRight", "d", "ArrowUp", "w", "ArrowDown", "s", " ", "Clear"].includes(e.key)) {
				e.preventDefault()
				this.keyboardInteraction(e.key)
			}
		}
	}
}


type Proxies =
	{
		presenterProxy(): DiagramPresenter
		diagramProxy(): I_Diagram
	}
