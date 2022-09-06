<script lang="ts" setup>
import { computed } from "@vue/reactivity";
import { MethodField } from "../../core/avalanche-app/root-diagram/diagram/element/field/application";
import { I_Field } from "../../core/avalanche-app/root-diagram/diagram/element/field/domain";
import { FieldType } from "../../core/general/domain";
import InboundPort from "./InboundPort.vue";
import OutboundPort from "./OutboundPort.vue";
import { useConnectingPaths } from "./useConnectingPaths";

const props = defineProps<{
    showInPort: boolean
    showOutPort: boolean
    x?: number
    y?: number
    dx?: number
    dy?: number
    width?: number
    text?: string
    field: I_Field
}>()

const {
    handleInLineStart,
    handleInLineEnd,
    handleOutLineStart,
    handleOutLineEnd
} = useConnectingPaths()

const dataTypeDef = computed<string>(() => {
    if (props.field.dataTypeDef != null) {
        if (props.field.dataTypeDef.refElement != null) {
            if (props.field.fieldType == FieldType.Property)
                return props.field.dataTypeDef.name + " (ref)"
        } else
            return props.field.dataTypeDef.fallbackDataType
    }
    return ""
})

</script>

<template>
    <g :transform="`translate(${x} ${y})`">
        <rect x="19" y="0" :width="props.width ? props.width - 37 : 0" height="16" class="element-bg" rx="0" ry="0" />
        <text x="20" y="13" :width="props.width ? props.width - 38 : 0" height="100" class="element-row-text"
		:style="{clipPath: `polygon(0px 0px, ${props.width ? props.width - 38 : 0}px 0px, ${props.width ? props.width - 38 : 0}px 20px, 0px 20px)`}"
		>
            <tspan class="field-name">{{ field.name }}
                <tspan class="field-param" v-if="field.fieldType == FieldType.Method">
                    (<template v-for="(p, i) in (field as MethodField).parameters">
                        {{ i > 0 ? ", " : "" }}{{ p.name }}
                    </template>)
                </tspan>
                <tspan v-if="field.fieldType" dx="2" class="field-datatype">&nbsp;{{ dataTypeDef }}</tspan>
            </tspan>
        </text>
        <!-- <circle cx="-5" cy="9" r="5" class="inPort" @pointerdown="handleInLineStart" @pointerup="handleInLineEnd"/>
        <circle cx="155" cy="9" r="5" class="outPort" @pointerdown="handleOutLineStart" @pointerup="handleOutLineEnd"/> -->
        <!-- <polygon points="-6,8 0,15 0,3" class="inPort" @pointerdown="handleInLineStart" @pointerup="handleInLineEnd"/> -->
        <!-- <polygon points="-5,-5 5,-5 5,5 -5,5" class="inPort" @pointerdown="handleInLineStart"
            @pointerup="handleInLineEnd" /> -->
        <!-- <polygon points="-5,-2 -2,-5 2,-5 5,-2 5,2 2,5 -2,5 -5,2" class="inPort" @pointerdown="handleInLineStart"
            @pointerup="handleInLineEnd" /> -->
        <InboundPort @pointeredown="handleInLineStart" @pointerup="handleInLineEnd" />
        <OutboundPort @pointerdown="handleOutLineStart" @pointerup="handleOutLineEnd" />
    </g>
</template>

<style scoped lang="scss">
.element-bg {
    position: relative;

}

.element-row-text {
    fill: #ddd
}


.field-name {
    font-size: .9rem;
filter: drop-shadow(.1em .1em .0em #000);

    .field-param {
        font-style: italic;
        font-size: .7em;
        vertical-align: middle;
fill: #ddd;
}

    .field-datatype {
        fill: #cc9;
        font-size: .7rem;
    }
}
</style>
