<script lang="ts" setup>
import { computed } from 'vue';
import {
    elementWidth, I_DraggableWrapper, I_Element, I_ElementsRelationship,
    I_Vector, rowHeight, Vector
} from '../../../../avalanche-core';
import { useDebugPoints } from "./useDebugPoints";

const { sourceElement, targetElement, rel } = defineProps<{
    sourceElement: I_DraggableWrapper<I_Element>
    targetElement: I_DraggableWrapper<I_Element>
    rel: I_ElementsRelationship
}>()

const clearance = 10


const { circles, addCircle, clearCircles } = useDebugPoints()


const points = computed<string>(() => {
    let path = ""
    if (sourceElement != undefined && targetElement != undefined) {


        const b = targetElement.dragger.location.x - sourceElement.dragger.location.x
        const h = targetElement.dragger.location.y - sourceElement.dragger.location.y
        const hip = Math.sqrt(h * h + b * b)
        const lateralFactor = b / hip
        const leanFactor = 3

        let lateralShift = (elementWidth / 2 * lateralFactor)
        let startX = sourceElement.dragger.location.x + elementWidth / 2 + lateralShift
        let endX = targetElement.dragger.location.x + elementWidth / 2 - lateralShift
        startX = Math.floor(startX)
        endX = Math.floor(endX)
        var midX = (endX + startX) / 2

        let startY1Y2 = sourceStartLineAtTopOrBottom()
        let start = new Vector(startX, startY1Y2[0])
        let startCurve = new Vector(startX, startY1Y2[1])

        let endY1Y2 = targetFinishLineAtTopOrBottom()
        let endCurve = new Vector(endX, endY1Y2[0])
        let end = new Vector(endX, endY1Y2[1])

        if ((sourceElement.dragger.location.y < targetElement.dragger.location.y + elementHeight(targetElement.element) + clearance * 2
            && sourceElement.dragger.location.y + elementHeight(sourceElement.element) > targetElement.dragger.location.y - clearance * 2)) {
            path = `M${start.x},${start.y}`
            path += ` V${startCurve.y}`
            path += ` L${start.x + (end.x - start.x) / 2},${startCurve.y}`
            path += ` V${endCurve.y}`
            path += ` L${end.x},${endCurve.y}`
            path += ` V${end.y}`
        } else {
            var d = Math.abs(endCurve.y - startCurve.y)
            var f = Math.floor(d * (Math.pow(lateralFactor, 2)) / 2)
            var midYCurve = (startCurve.y + endCurve.y) / 2

            path = `M${start.x},${start.y}`
            clearCircles()
            addCircle(start.x, start.y, "M", "pink")

            addCircle(startCurve.x, startCurve.y, "S", "red")

            var c1X = startCurve.x
            var c1Y = midYCurve
            var tX = midX
            var tY = c1Y

            path += ` Q${c1X},${c1Y} ${tX},${tY}`
            addCircle(c1X, c1Y, "C1", "purple")
            addCircle(tX, tY, "T1", "orange")

            c1X = end.x
            c1Y = c1Y
            tX = endCurve.x
            tY = endCurve.y

            path += ` Q${c1X},${c1Y} ${tX},${tY}`
            addCircle(c1X, c1Y, "C2", "yellow")
            addCircle(tX, tY, "T2", "blue")
        }
    }

    return path
})

let tag = computed<I_Vector>(() => {
    if (sourceElement != undefined && targetElement != undefined) {
        const ys1 = sourceStartLineAtTopOrBottom()
        const ys2 = targetFinishLineAtTopOrBottom()
        return new Vector((sourceElement.dragger.location.x + elementWidth / 2 + targetElement.dragger.location.x + elementWidth / 2) / 2,
            (ys1[1] + ys2[1]) / 2)
    }
    return new Vector(0, 0)
})


function elementHeight(elem: I_Element): number {
    return elem.fields.length * rowHeight + 20
}

function sourceStartLineAtTopOrBottom(): [number, number] {
    const y1 = sourceElement.dragger.location.y
    const y2 = targetElement.dragger.location.y
    const elemHeight = elementHeight(sourceElement.element)

    if (y1 + elemHeight / 2 < y2)
        return [y1 + elemHeight, y1 + elemHeight + clearance]
    else
        return [y1, y1 - clearance]
}

function targetFinishLineAtTopOrBottom(): [number, number] {
    const y1 = sourceElement.dragger.location.y
    const y2 = targetElement.dragger.location.y
    const elemHeight = elementHeight(targetElement.element)

    if (y1 < y2 + elemHeight / 2)
        return [y2 - clearance, y2 - 9]
    else
        return [y2 + elemHeight + clearance, y2 + elemHeight + 9]
}

</script>

<template>
    <defs>
        <marker id="generic-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse" markerWidth="10"
            markerHeight="10" orient="auto">
            <polygon points="1,5 9,5" class="in-port" stroke="#456" fill="none" />
        </marker>

        <marker id="inheritance-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" stroke="#5d9" fill="none" />
        </marker>

        <marker id="implements-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" stroke="#f59" fill="none" />
        </marker>

        <marker id="realization-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" stroke="#fff" fill="none" />
        </marker>

        <marker id="directed-association-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" fill="#f4a" />
        </marker>

        <marker id="aggregation-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 5,9 9,5 5,1" class="in-port" stroke="orange" fill="none" />
        </marker>

        <marker id="composition-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 5,9 9,5 5,1" class="in-port" fill="pink" />
        </marker>



        <marker id="test-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse" markerWidth="10"
            markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" stroke="#fff" fill="none" />
        </marker>

    </defs>

    <template v-if="circles.length > 0" v-for="c, i in circles" :key="i">
        <circle :cx="c.x" :cy="c.y" r="10" :fill="c.color" stroke="none" stroke-width=".05em" style="opacity: .3;" />
        <text :x="c.x - 20" :y="c.y - 10" stroke="none" :fill="c.color" font-size="10" stroke-width=".05em"
            style="opacity: .3;">{{ c.tag }}</text>
    </template>
    <!-- <line :class="rel.relationshipType.toLowerCase()" :start.x="props.start.x" :x2="props.x2" :y1="props.y1" :y2="props.y2" fill="none"
        stroke="#555" stroke-width="40" /> -->

    <!-- :points="`${props.start.x},${props.y1} ${props.start.x},${props.y1 > props.y2 ? props.y1 - 15 : props.y1 + 15} ${props.x2},${props.y1 > props.y2 ? props.y2 - 15 : props.y2 + 15} ${props.x2},${props.y2}`" -->

    <path :class="rel.relationshipType.toLowerCase()" :d="points" fill="none" closed="false" stroke="#555"
        stroke-width="40" />

    <g :style="{ transform: `translate(${tag.x}px, ${tag.y}px)` }">
        <text x="0" y="0" text-anchor="middle" class="tag">{{ rel.tag }}</text>
        <text x="0" :dy="rowHeight / 1.2" text-anchor="middle" class="type">{{ rel.relationshipType }}</text>
    </g>
</template>

<style lang="scss" scoped>
.tag {
    font-size: .4em;
    transform-origin: center center;
}

.type {
    font-size: .4em;
}

.all {
    stroke-width: .1em;
}

.association {
    @extend .all;
    stroke: #555;
    marker-end: none;
}

.directedassociation {
    @extend .all;
    stroke: #f4a; //#747
    marker-end: url(#directed-association-endcap);
}

.aggregation {
    @extend .all;
    stroke: orange;
    marker-end: url(#aggregation-endcap);
}

.composition {
    @extend .all;
    stroke: pink;
    marker-end: url(#composition-endcap);
}

.inheritance {
    @extend .all;
    stroke: #5d9; //#559
    stroke-dasharray: 4 2;
    marker-end: url(#inheritance-endcap);
}

.implements {
    @extend .all;
    stroke: #f59;
    stroke-dasharray: 5 1;
    marker-end: url(#implements-endcap);
}

.use {
    @extend .all;
    stroke: #456;
    marker-end: url(#generic-endcap);
}
</style>