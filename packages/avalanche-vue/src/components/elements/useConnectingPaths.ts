export function useConnectingPaths() {
    const handleInLineStart = (e: MouseEvent) => {
        e.stopPropagation()
        console.log("In Line Start")
    }

    const handleInLineEnd = (e: MouseEvent) => {
        e.stopPropagation()
        console.log("In Line End")
    }

    const handleOutLineStart = (e: MouseEvent) => {
        e.stopPropagation()
        console.log("Out Line Start")
    }

    const handleOutLineEnd = (e: MouseEvent) => {
        e.stopPropagation()
        console.log("Out Line End")
    }

    return {
        handleInLineStart,
        handleInLineEnd,
        handleOutLineStart,
        handleOutLineEnd
    }

}