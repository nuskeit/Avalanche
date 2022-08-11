<!-- <script lang="ts" setup>
import { I_Element } from '../../../domain/diagram/element/element';
import { I_DraggableWrapper } from '../../../domain/Draggable';
import { I_ElementsRelationship } from '../../../domain/elements-relationship';
import { elementWidth, rowHeight } from '../../../domain/Const';
import { computed } from 'vue';
import { I_Vector, Vector } from '../../../domain/generic-types';

const { sourceElement, targetElement, rel } = defineProps<{
    sourceElement: I_DraggableWrapper<I_Element>
    targetElement: I_DraggableWrapper<I_Element>
    rel: I_ElementsRelationship
}>()

const clearance = 10

const points = computed<string>(() => {
    let poly = ""

    if (sourceElement != undefined && targetElement != undefined) {


        const b = targetElement.dragger.location.x - sourceElement.dragger.location.x
        const h = targetElement.dragger.location.y - sourceElement.dragger.location.y
        const hip = Math.sqrt(h * h + b * b)
        const lateralFactor = b / hip

        let y1y2 = sourceStartLineAtTopOrBottom()

        let lateralShift = (elementWidth / 2 * lateralFactor)
        let x1 = sourceElement.dragger.location.x + elementWidth / 2 + lateralShift  //* distributionFactor
        let x4 = targetElement.dragger.location.x + elementWidth / 2 - lateralShift  //* distributionFactor



        let y3y4 = targetFinishLineAtTopOrBottom()

        if ((sourceElement.dragger.location.y < targetElement.dragger.location.y + elementHeight(targetElement.element) + clearance * 2
            && sourceElement.dragger.location.y + elementHeight(sourceElement.element) > targetElement.dragger.location.y - clearance * 2)) {
            poly = `${x1},${y1y2[0]}`
            poly += ` ${x1},${y1y2[1]}`
            poly += ` ${x1 + (x4 - x1) / 2},${y1y2[1]}`
            poly += ` ${x4 - (x4 - x1) / 2},${y3y4[0]}`
        } else {
            var sourceY = y1y2[1]
            var targetY = y3y4[0]
            var d = Math.abs(targetY - sourceY)
            var f = d * (.01 + Math.pow(lateralFactor, 2)) / 2
            var midY = (sourceY + targetY) / 2

            y1y2[1] = midY - f * Math.sign(targetY - sourceY)
            y3y4[0] = midY + f * Math.sign(targetY - sourceY)

            poly = `${x1},${y1y2[0]}`
            poly += ` ${x1},${y1y2[1]}`
        }

        poly += ` ${x4},${y3y4[0]}`
        poly += ` ${x4},${y3y4[1]}`
    }

    return poly
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

</script> -->

<!-- <template>
    <defs>
        <marker id="generic-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse" markerWidth="10"
            markerHeight="10" orient="auto">
            <polygon points="1,5 9,5" class="in-port" stroke="#444" fill="none" />
        </marker>

        <marker id="inheritance-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" stroke="#444" fill="none" />
        </marker>

        <marker id="realization-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" stroke="#444" fill="none" />
        </marker>

        <marker id="directed-association-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" fill="#444" />
        </marker>

        <marker id="aggregation-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 5,9 9,5 5,1" class="in-port" stroke="#444" fill="none" />
        </marker>

        <marker id="composition-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse"
            markerWidth="10" markerHeight="10" orient="auto">
            <polygon points="1,5 5,9 9,5 5,1" class="in-port" fill="#444" />
        </marker>



        <marker id="test-endcap" viewBox="0 0 10 10" refX="0" refY="5" markerUnits="userSpaceOnUse" markerWidth="10"
            markerHeight="10" orient="auto">
            <polygon points="1,5 1,9 9,5 1,1" class="in-port" stroke="#444" fill="none" />
        </marker>

    </defs>

    < !-- <line :class="rel.relationshipType.toLowerCase()" :x1="props.x1" :x2="props.x2" :y1="props.y1" :y2="props.y2" fill="none"
        stroke="#555" stroke-width="40" /> -- >

    < !-- :points="`${props.x1},${props.y1} ${props.x1},${props.y1 > props.y2 ? props.y1 - 15 : props.y1 + 15} ${props.x2},${props.y1 > props.y2 ? props.y2 - 15 : props.y2 + 15} ${props.x2},${props.y2}`" -- >

    <polyline :class="rel.relationshipType.toLowerCase()" :points="points" fill="none" stroke="#555" stroke-width="40" />

    <g :style="{ transform: `translate(${tag.x}px, ${tag.y}px)` }">
        <text x="0" y="0" text-anchor="middle" class="tag">{{ rel.tag }}</text>
        <text x="0" :dy="rowHeight / 1.2" text-anchor="middle" class="type">{{ rel.relationshipType }}</text>
    </g>
</template> -->

<!-- <style lang="scss" scoped>
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
    stroke: #747;
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
    stroke: #559;
    stroke-dasharray: 4 2;
    marker-end: url(#inheritance-endcap);
}

.implements {
    @extend .all;
    stroke: #f59;
    stroke-dasharray: 5 1;
    marker-end: url(#inheritance-endcap);
}

.use {
    @extend .all;
    stroke: #456;
    marker-end: url(#generic-endcap);
}
</style> -->