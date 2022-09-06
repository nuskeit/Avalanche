import { ref } from "vue"

export function useDebugPoints() {

    const circles = ref<{ x: number, y: number, tag: string, color: string }[]>([])
    const debugFlag = false


    function addCircle(x: number, y: number, tag: string, color: string) {
        if (debugFlag)
            circles.value.push({ x, y, tag, color })
    }

    function clearCircles() {
        circles.value.length = 0
    }

    return { circles, addCircle, clearCircles }
}