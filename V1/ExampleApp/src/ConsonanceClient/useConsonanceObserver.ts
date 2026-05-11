import { useContext, useRef } from "react"
import { Consonance_Ctx, type IConsonanceObserverMsg } from "./Context"

/**
 * Hook can be added anywhere within <Consonance/>
 * The returned props can be spread into a <Profiler/>
 */
export const useConsonanceObserver = (observerId: string, observerState?: object) => {

    const consonance = useContext(Consonance_Ctx)
    const renderCount = useRef<number>(0)

    const onRender = (id:unknown, phase:string, actualDuration:number, baseDuration:number, startTime:number, commitTime:number) => {
        
        console.log(id)

        renderCount.current++

        const obj: IConsonanceObserverMsg = {
            component: observerId,
            metrics: {
                timestamp: Date.now().toString(),
                phase:phase,
                actualDuration:actualDuration.toFixed(0),
                baseDuration:baseDuration.toFixed(0),
                startTime:startTime.toFixed(0),
                commitTime:commitTime.toFixed(0)
            },
            state: {
                ...observerState
            },
            renderCount: renderCount.current
        }

        consonance.sendMessage(obj)
    }

    return {
        onRender,
        id: observerId
    }
}
