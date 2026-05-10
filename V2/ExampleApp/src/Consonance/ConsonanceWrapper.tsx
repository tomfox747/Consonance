import type { JSX } from "react"
import { useConsonance } from "./useConsonanceWrapper"

export const ConsonanceWrapper = (props:{children: JSX.Element, state: string}) => {

    const consonance = useConsonance(props.state)

    return <div ref={consonance.captureRef}>
        {props.children}
    </div>
}
