<script lang="ts" setup>
import { reactive } from "vue";
import { FieldType, rowHeight } from "../../core/general/domain";
import { FieldPresenter } from "./field-presenter";
import { useConnectingPaths } from "./useConnectingPaths";
import { I_Field } from "../../core/field/domain";
import { MethodField } from "../../core/field/application";
const props = defineProps<{
	index: number
	width: number
	field: I_Field
}>()

const {
	handleInLineStart,
	handleInLineEnd,
	handleOutLineStart,
	handleOutLineEnd
} = useConnectingPaths()



const presenter: FieldPresenter = reactive<FieldPresenter>(new FieldPresenter(
	{
		fieldProxy: () => props.field,
		presenterProxy: () => presenter
	}))


const style = {
	element_bg: {
		position: "relative"

	},

	invalid: {
		fill: "red"
	},

	element_row_text: {
		fill: "#ddd"
	},

	field_name: {
		fontSize: ".9rem",
		filter: "drop-shadow(.1em .1em .0em #000)",
		field_param: {
			fontStyle: "italic",
			fontSize: ".7em",
			verticalAlign: "middle",
			fill: "#ddd"
		},

		field_datatype: {
			fill: "#cc9",
			fontSize: ".7rem"
		}
	}

}


</script>

<template>
	<defs>
		<svg:style type="text/css">
			{{ presenter.svgStyle }}
		</svg:style>
	</defs>
	<g :transform="`translate(0 ${16 + rowHeight * props.index})`">
		<rect x="19" y="0" :width="props.width ? props.width - 37 : 0" height="16"
			:class="`element-bg ${props.field.valid ? '' : 'invalid'}`" rx="0" ry="0" />
		<text :x="4" y="9" :width="props.width ? props.width - 38 : 0" height="100"
			:style="{ clipPath: `polygon(0px 0px, ${props.width ? props.width - 38 : 0}px 0px, ${props.width ? props.width - 38 : 0}px 20px, 0px 20px)` }">
			<tspan class="field-name">{{ `${field.scopeSymbol} ${field.name}` }}
				<tspan class="field-param" v-if="field.fieldType == FieldType.Method">
					(<template v-for="(p, i) in (field as MethodField).parameters" :key="Math.random()">
						{{ i > 0 ? ", " : "" }}{{ p.name }}
					</template>)
				</tspan>
				<tspan v-if="field.fieldType" dx="2" class="field-datatype">&nbsp;{{ presenter.dataTypeDef }}</tspan>
			</tspan>
		</text>
	</g>
</template>
