import {
	DraggableHelper, Throttle, I_Element, I_Diagram,
	DraggableWrapper, Dragger, I_DraggableWrapper, DraggableObjectType,
	I_Vector, Nullable, Vector,
	ViewBox, ViewPort, Presenter } from '../../..'
const t = new Throttle()

export class DiagramPresenter extends Presenter {

	diagram: I_Diagram

	viewBox: ViewBox
	viewport: ViewPort

	draggableElement: I_DraggableWrapper<I_Element> | undefined
	draggableViewBox: I_DraggableWrapper<I_Vector> | undefined
	draggingDynamicClassName: string = ""

	dragType: DraggableObjectType | undefined

	interval: number | undefined
	keyboardNavFlag: boolean = false

	draggable: any


	// Delegates
	toLocalVector: Function

	constructor(diagram: I_Diagram, toLocalVector: Function) {
		super(undefined)
		this.diagram = diagram
		this.toLocalVector = toLocalVector
		this.draggable = new DraggableHelper(toLocalVector)
		this.viewBox = new ViewBox(0, 0, 1280, 720)
		this.viewport = new ViewPort(0, 0, 1920, 1080)
	}


	detectDraggingMode(e: PointerEvent) {
		if (this.draggableElement == undefined) {
			let loc = this.toLocalVector(e.clientX, e.clientY)
			this.dragType = DraggableObjectType.viewBox
			this.draggableViewBox = new DraggableWrapper<I_Vector>(this.viewBox,
				new Dragger("draggableViewBox", loc, new Vector(e.clientX, e.clientY)))
		} else
			this.draggable.StartDrag(this.draggableElement)

		this.draggingDynamicClassName = "dragging"
	}


	startDraggingElement(se: I_DraggableWrapper<I_Element>) {
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
			}, 30)
		}
	}


	UpdateDragViewBox(se: Nullable<I_DraggableWrapper<I_Vector>>, clientX: number, clientY: number) {
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

	keyboardNavigation(v: I_Vector) {
		this.keyboardNavFlag = true
		this.interval = setInterval(
			() => {
				if (!this.keyboardNavFlag) {
					clearInterval(this.interval)
					return
				}
				const navVector: Vector = new Vector(20 * v.x, 20 * v.y)
				if (v.x === 0 && v.y === 0) { // center
					this.travelTo({ x: 0, y: 0 })
				} else { // navigate
					this.travel(navVector.x, navVector.y)
				}
			}, 150)
	}

	keyboardInteraction(e: KeyboardEvent) {
		const moveVec: I_Vector = new Vector(0, 0)
		const zoomFactor = 10

		if (e.key == "+") {
			e.preventDefault()
			this.zoom(-zoomFactor)
		} else if (e.key == "-") {
			e.preventDefault()
			this.zoom(zoomFactor)
		}


		if (e.key == "ArrowLeft" || e.key == "a") {
			e.preventDefault()
			moveVec.x = -3
		}
		else if (e.key == "ArrowRight" || e.key == "d") {
			e.preventDefault()
			moveVec.x = 3
		}
		if (e.key == "ArrowUp" || e.key == "w") {
			e.preventDefault()
			moveVec.y = -3
		}
		else if (e.key == "ArrowDown" || e.key == "s") {
			e.preventDefault()
			moveVec.y = 3
		}

		if (e.key == " " || e.key == "Clear") {
			e.preventDefault()
			this.travelTo({ x: 0, y: 0 })
		} else {
			const travelFactor = 25
			moveVec.x *= travelFactor
			moveVec.y *= travelFactor
			this.travel(moveVec.x, moveVec.y)
		}
	}

	quitKeyboardInteraction() {
		clearInterval(this.interval)
		this.keyboardNavFlag = false
	}

	zoom(factor: number): void {
		this.viewport.x -= factor
		this.viewport.y -= factor
		this.viewport.width += factor
		this.viewport.height += factor
	}

	travel(factorX: number, factorY: number): void {
		this.viewBox.x += factorX
		this.viewBox.y += factorY
	}

	travelTo(v: I_Vector): void {
		this.viewBox.x = v.x
		this.viewBox.y = v.y
	}

}
