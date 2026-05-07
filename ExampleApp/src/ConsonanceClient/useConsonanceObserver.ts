import { useContext, useRef } from "react"
import { Consonance_Ctx } from "./Context"

/**
 * Hook can be added anywhere within <Consonance/>
 * The returned props can be spread into a <Profiler/>
 */
export const useConsonanceObserver = (observerId: string) => {

    const consonance = useContext(Consonance_Ctx)
    const renderCount = useRef<number>(0)

    const onRender = (id:unknown, phase:unknown, actualDuration:number, baseDuration:number, startTime:number, commitTime:number) => {
        
        renderCount.current++
        consonance.sendMessage({
            component: observerId,
            value: {
                id: id,
                phase:phase,
                actualDuration:actualDuration.toFixed(0),
                baseDuration:baseDuration.toFixed(0),
                startTime:startTime.toFixed(0),
                commitTime:commitTime.toFixed(0)
            },
            renderCount: renderCount.current
        })
    }

    return {
        onRender,
        id: observerId
    }
}
