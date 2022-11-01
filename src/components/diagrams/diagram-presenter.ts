import { I_Diagram } from '../../core/avalanche-app/root-diagram/diagram/domain'
import { I_Element } from '../../core/avalanche-app/root-diagram/diagram/element/domain'
import { I_Grid } from '../../core/avalanche-app/root-diagram/diagram/grid/domain'
import { I_Draggable } from '../../core/drag/domain'
import { AppFactory } from '../../core/factories/app-factory/application'
import { DraggableObjectType, I_Vector, Nullable, Size, travelStep } from '../../core/general/domain'
import { DraggableHelper, I_Presenter, Throttle } from '../../core/general/presenter'
import { Grid } from './grid-presenter'
const t = new Throttle()

export class DiagramPresenter implements I_Presenter<I_Diagram> {

	draggableElement: I_Draggable<I_Element> | undefined
	draggableViewBox: I_Draggable<I_Vector> | undefined
	draggingDynamicClassName: string = ""

	dragType: DraggableObjectType | undefined

	navigationInterval: any

	keyboardNavFlag: boolean = false

	draggableHelper: any

	grid: I_Grid


	viewBoxRealSize: { width: number, height: number }

	zoomState = {
		factor: 100,
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
		} else if (value != null && this._prevEditElementKey != value.key) {
			this._prevEditElementKey = value.key
		}
		this.diagramProxy.detectRelationshipsChanges()
	}

	selectedElement: Nullable<I_Element> = null

	get elementEditorVisible(): boolean { return this.editElement != null }

	get originPointerVisible(): boolean {
		if (this.diagramProxy.viewBox.x > 0 || this.diagramProxy.viewBox.x < -this.viewBoxRealSize.width ||
			this.diagramProxy.viewBox.y > 0 || this.diagramProxy.viewBox.y < -this.viewBoxRealSize.height)
			return true
		else
			return false
	}

	constructor(proxies: Proxies,

		diagramSvgAccessor: Function,
		diagramSvgPointAccessor: Function
	) {
		this.proxies = proxies
		this.draggableHelper = new DraggableHelper(this.toLocalVector)
		this.grid = new Grid(this.diagramProxy.viewBox, this.diagramProxy.viewPort)
		this.delegates = {
			diagramSvgAccessor,
			diagramSvgPointAccessor
		}
		// this.viewBoxRealSize = { width: parseInt( diagramSvgAccessor().width.animVal.value), height: parseInt( diagramSvgAccessor().height.animVal.value )}
		this.viewBoxRealSize = { width: proxies.diagramProxy().viewBox.width, height: proxies.diagramProxy().viewBox.height }
	}

	toLocalVector = (clientX: number, clientY: number): I_Vector => {
		this.delegates.diagramSvgPointAccessor().x = clientX; this.delegates.diagramSvgPointAccessor().y = clientY;
		return this.delegates.diagramSvgPointAccessor().matrixTransform(this.delegates.diagramSvgAccessor().getScreenCTM().inverse());
	}

	get navigationControlLocation(): I_Vector {
		return { x: this.diagramProxy.viewBox.width - 210, y: 50 }
	}

	get diagramToolboxLocation(): I_Vector {
		return { x: this.diagramProxy.viewBox.width - 230, y: 270 }
	}

	detectDraggingMode(e: PointerEvent) {
		if (this.draggableElement == undefined) {
			let loc = this.toLocalVector(e.clientX, e.clientY)
			this.dragType = DraggableObjectType.viewBox
			this.draggableViewBox = AppFactory.getSingleton().createDraggable<I_Vector>(this.diagramProxy.viewBox, loc)
		} else
			this.draggableHelper.StartDrag(this.draggableElement)

		this.presenterProxy.draggingDynamicClassName = "dragging"
	}


	startDraggingElement(se: I_Draggable<I_Element>, mouseLocation: I_Vector) {
		this.dragType = DraggableObjectType.element
		this.draggableElement = se
		this.draggableHelper.StartDrag(this.draggableElement, mouseLocation)
	}

	updateDrag(e: PointerEvent) {
		this.keyboardNavFlag = false
		if (this.dragType == DraggableObjectType.element) {
			t.throttle(() => {
				if (this.draggableElement == undefined) return
				this.draggableHelper.UpdateDrag(this.draggableElement, e.clientX, e.clientY)
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
			se.element.x -= (loc.x - se.location.x)
			se.element.y -= (loc.y - se.location.y)
		}
	}


	cancelDrag() {
		this.draggableElement = undefined
		this.draggableViewBox = undefined
		this.presenterProxy.draggingDynamicClassName = ""
		this.draggableHelper.EndDrag()
	}

	screenPadNavigation(v: I_Vector) {
		this.presenterProxy.keyboardNavFlag = true
		this.presenterProxy.navigationInterval = setInterval(
			() => {
				this.grid.drawGrid()

				if (!this.keyboardNavFlag) {
					clearInterval(this.navigationInterval)
					return
				}
				const navVector: I_Vector = AppFactory.getSingleton().createVector(20 * v.x, 20 * v.y)
				if (v.x === 0 && v.y === 0) { // center
					this.travelToCenter()
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
		clearInterval(this.navigationInterval)
		this.keyboardNavFlag = false
	}

	zoom(factor: number): void {
		this.presenterProxy.zoomState.level += factor
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
		}
		const avgW = (minW + maxW) / 2
		const avgH = (minH + maxH) / 2

		const x = this.viewBoxRealSize.width / 2
		const y = this.viewBoxRealSize.height / 2

		this.travelTo({ x: avgW - x, y: avgH - y })

		// this.travelTo({ x: -avgW, y: -avgH })

		// this.travelTo(this.toLocalVector(-avgW, -avgH))

		// this.travelTo({ x: -this.diagramProxy.viewBox.width / 2, y: -this.diagramProxy.viewBox.height / 2 })
	}

	proxies: Proxies
	get presenterProxy(): DiagramPresenter { return this.proxies.presenterProxy() }
	get diagramProxy(): I_Diagram { return this.proxies.diagramProxy() }

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

	// UI events handler
	eventsHandler = {
		deleteElement: (element: I_Element) => {
			this.diagramProxy.removeElement(element.key)
			this.presenterProxy.selectedElement = null
		},

		diagramPointerDownHandler: (e: PointerEvent) => {
			this.presenterProxy.selectedElement = null
			this.presenterProxy.editElement = null
			this.detectDraggingMode(e)
		},

		startDraggingElementHandler: (se: I_Draggable<I_Element>, mouseLocation: I_Vector) => {
			this.startDraggingElement(se, mouseLocation)
		},

		selectElementHandler: (element: Nullable<I_Element>) => {
			this.presenterProxy.selectedElement = element
			this.presenterProxy.editElement = element
		},

		svgResizeHandler: () => {
			console.log('x');
			requestAnimationFrame(() => {

				this.diagramProxy.viewBox.width = this.delegates.diagramSvgAccessor().width.animVal.value
				this.diagramProxy.viewBox.height = this.delegates.diagramSvgAccessor().height.animVal.value
				this.presenterProxy.viewBoxRealSize.width = this.delegates.diagramSvgAccessor().width.animVal.value
				this.presenterProxy.viewBoxRealSize.height = this.delegates.diagramSvgAccessor().height.animVal.value
			})

		},

		// closeElementEditorHandler: () => {
		// 	console.log('CLOSE EDITOR');
		// 	this.presenterProxy.editElement = null
		// 	this.presenterProxy.diagramProxy.relationships = { ...this.presenterProxy.diagramProxy.relationships }
		// },

		// updateElementHandler: (e: I_Element) => {
		// 	console.log('UPDATE ELEMENT');
		// 	this.diagramProxy.elements[e.key].element = e
		// },

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

		handleKeyDown: (e: KeyboardEvent) => {
			// Zoom funtionality
			// if (e.key == "+") {
			// 	console.log('MAS');
			// 	this.zoom(-this.zoomFactor)
			// } else if (e.key == "-") {
			// 	this.zoom(this.zoomFactor)
			// }

			if (!e.ctrlKey && !e.altKey && !e.shiftKey && ["+", "-", "ArrowLeft", "a", "ArrowRight", "d", "ArrowUp", "w", "ArrowDown", "s", " ",
				"Clear", "Delete"].includes(e.key)) {
				e.preventDefault()
				this.keyboardInteraction(e.key)
			}
		}
	}


	svgStyle = `
	.element-template {
		fill: none;
		overflow: hidden;
	}

	.element-template text {
		fill: white;
		font-size: .6rem;
	}

	.selected {
		stroke: #0f0;
		stroke-width: 1.5;
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
		filter: drop-shadow(4px 4px 1.5px rgb(0 0 0 / .5));
		stroke: #aaa;
		fill: #7778;
	}

	.element-template-inner-body {
		stroke-width: 1;
		stroke: #333;
		fill: #000, 1);
	}


	.Block {
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
		fill: #55a3;
	}
	`

}


type Proxies = {
	presenterProxy(): DiagramPresenter
	diagramProxy(): I_Diagram
}
