import type { JSX } from "react"
import { ConsonanceSubscriberCtx, useConsonance } from "./useConsonanceWrapper"

export const ConsonanceWrapper = (props:{children: JSX.Element, state: string}) => {

    const consonance = useConsonance(props.state)

    return <div ref={consonance.captureRef}>
        <ConsonanceSubscriberCtx.Provider value={{fire: consonance.fire}}>
            {props.children}
        </ConsonanceSubscriberCtx.Provider>
    </div>
}