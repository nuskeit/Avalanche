<script setup lang="ts">
import { computed } from "vue";
import { I_Element } from '../../../../../avalanche-core';
import TextBox from '../../controls/TextBox.vue';

const props = defineProps<{ modelValue: I_Element }>()

const emit = defineEmits<{
    (e: "close"): void,
    (e: "update:modelValue", payload: I_Element): void
}>()

const element = computed<I_Element>({
    get: (): I_Element => props.modelValue,
    set: (value: I_Element) => emit("update:modelValue", value)
})

const handleClose = async () => {
    emit("close")
}

</script>

<template>
    <div class="element-editor_root">
        <div>Diagram Element Editor</div>
        <div class="buttons">
            <button @click="handleClose()">CLOSE</button>
        </div>
        <div>
            <div class="element-editor_cell">
                <label :for="`${element.key}`">Name:</label>
                <TextBox :id="`${element.key}`" v-model="element.name" />
            </div>
        </div>
        <div class="element-editor_row" v-for="field, i in element.fields" :key="i">

            <div class="element-editor_cell tag">
                <!-- <FieldTypesComboBox :id="field.id.toString()" v-model="field.fieldType" /> -->
                {{ field.fieldType }}
            </div>

            <div class="element-editor_cell editable">
                <!-- <label :for="`text-${field.id.toString()}`">Text:</label> -->
                <TextBox :id="field.key" v-model="field.text" />
            </div>

        </div>
    </div>
</template>

<style scoped lang="scss">
.element-editor_root {
    background-image: linear-gradient(#ccc 14%, #777);
    border: solid rgba(#bbb, .5) .1rem;
    box-shadow: .2rem .2rem .2rem rgba(#000, .5);
    position: absolute;
    left: calc(50% - 5.5rem);
    right: auto;
    top: 25%;
    bottom: auto;
    padding-left: .7rem;
    padding-right: .7rem;

    .top-buttons{
        display: flex ;
        flex-direction: column;
        padding: .2rem;
        align-items: flex-end;
    }


    .element-editor_row {
        display: flex;
        flex-direction: row;
        padding: .1rem;


        .element-editor_cell {
            display: flex;
            flex-direction: row;
            align-items: center;

        }

        .editable {
            background: rgba(#03a, .2);
            border: solid .1rem rgba(#03a, .2);
            padding-left: .2rem;
            padding-right: .2rem;
        }

        .tag {
            background: rgba(#a30, .3);
            border: solid .1rem rgba(#a30, .4);
            padding-left: .2rem;
            padding-right: .2rem;
        }
    }

}
</style>