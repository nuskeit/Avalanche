<script lang="ts" setup>
import { ref } from 'vue';
import { I_Vector } from '../../../../avalanche-core';

const { navFlag } = defineProps<{ navFlag: boolean }>()

const lastPressed = ref<string>("")

const emit = defineEmits<{
    (e: "navigate", payload: I_Vector): void
    (e: "stop-navigating"): void
}>()

function emitUL() {
    lastPressed.value = 'ul';
    emit('navigate', { x: -1, y: -1 })
}
function emitU() {
    lastPressed.value = 'u';
    emit('navigate', { x: 0, y: -1 })
}
function emitUR() {
    lastPressed.value = 'ur';
    emit('navigate', { x: 1, y: -1 })
}
function emitL() {
    lastPressed.value = 'l';
    emit('navigate', { x: -1, y: 0 })
}
function emitC() {
    lastPressed.value = 'c';
    emit('navigate', { x: 0, y: 0 })
}
function emitR() {
    lastPressed.value = 'r';
    emit('navigate', { x: -1, y: 0 })
}
function emitDL() {
    lastPressed.value = 'dl';
    emit('navigate', { x: -1, y: 1 })
}
function emitD() {
    lastPressed.value = 'd';
    emit('navigate', { x: 0, y: 1 })
}
function emitDR() {
    lastPressed.value = 'dr';
    emit('navigate', { x: -1, y: 1 })
}



</script>

<template>
    <div class="navigation-root">
        <div class="row">
            <div :class="`navigation-buttons cell ul ${lastPressed == 'ul' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitUL" @pointerup="emit('stop-navigating')">
            </div>
            <div :class="`navigation-buttons cell u  ${lastPressed == 'u' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitU" @pointerup="emit('stop-navigating')">
            </div>
            <div :class="`navigation-buttons cell ur  ${lastPressed == 'ur' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitUR" @pointerup="emit('stop-navigating')">
            </div>
        </div>
        <div class="row">
            <div :class="`navigation-buttons cell l  ${lastPressed == 'l' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitL" @pointerup="emit('stop-navigating')">
            </div>
            <div :class="`navigation-buttons cell c  ${lastPressed == 'c' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitC" @pointerup="emit('stop-navigating')">
            </div>
            <div :class="`navigation-buttons cell r  ${lastPressed == 'r' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitR" @pointerup="emit('stop-navigating')">
            </div>
        </div>
        <div class="row">
            <div :class="`navigation-buttons cell dl  ${lastPressed == 'dl' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitDL" @pointerup="emit('stop-navigating')">
            </div>
            <div :class="`navigation-buttons cell d  ${lastPressed == 'd' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitD" @pointerup="emit('stop-navigating')">
            </div>
            <div :class="`navigation-buttons cell dr  ${lastPressed == 'dr' && navFlag == true ? ' pressed ' : ''}`"
                @pointerdown="emitDR" @pointerup="emit('stop-navigating')">
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.navigation-root {
    background-color: rgba(#fff, .2);
    position: absolute;
    right: 1rem;
    top: 4rem;

    display: table;


    .navigation-buttons {
        cursor: pointer;
    }

    .row {
        display: table-row;
        height: 2rem;
    }

    .ul {
        background: url('../../assets/arrow-ul.png');
    }

    .u {
        background: url('../../assets/arrow-u.png')
    }

    .ur {
        background: url('../../assets/arrow-ur.png')
    }

    .l {
        background: url('../../assets/arrow-l.png')
    }

    .c {
        background: url('../../assets/arrow-c.png')
    }

    .r {
        background: url('../../assets/arrow-r.png')
    }

    .dl {
        background: url('../../assets/arrow-dl.png')
    }

    .d {
        background: url('../../assets/arrow-d.png')
    }

    .dr {
        background: url('../../assets/arrow-dr.png')
    }

    .cell {
        display: table-cell;
        vertical-align: middle;
        padding: 0;


        width: 3.33rem;
        height: 3.33rem;
        background-repeat: no-repeat;
        background-size: contain;
    }

    .pressed {
        background-color: rgba(#fff, .3);
    }

}
</style>