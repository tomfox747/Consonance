import React, { useRef, type  JSX, useEffect } from "react";
import { Consonance_Ctx, type IConsonanceObserverMsg } from "./Context";

/**
 * Component should be added at the root of an application, 
 * as a provider for interacting with the server websocket
 */
export const Consonance = React.memo((props:{children:JSX.Element}) => {
    
    const memoryRef = useRef({ mem_max: 0, mem_current: 0, mem_percentUsage:0});
    const ws = useRef<WebSocket|null>(null)

    useEffect(() => {
        
        // setup websocket
        ws.current = new WebSocket(`ws://localhost:${4000}`);
        ws.current.onopen = () => {console.log("Consonance Connected");};
        ws.current.onmessage = (event) => {console.log(event)};
        ws.current.onclose = () => {console.log("Consonance Disconnected");};
        
        // handle ongoing memory usage metrics
        const memInt = setInterval(()=>{
            const p:Performance = performance
            memoryRef.current = {mem_current: p.memory!.usedJSHeapSize, mem_max: p.memory!.jsHeapSizeLimit, mem_percentUsage: Number((p.memory!.usedJSHeapSize / ((p.memory!.jsHeapSizeLimit)/100)).toFixed(2))}
        }, 1000)

        return () => {
            ws.current?.close();
            clearInterval(memInt)
        };

    }, [])

    const m = (message:IConsonanceObserverMsg) => {if(ws.current) ws.current.send(JSON.stringify({
        ...message,
        metrics: {...memoryRef.current, ...message.metrics},
    }))}

    const domREF = useRef(null)

    console.log(JSON.stringify(domREF))

    return <Consonance_Ctx.Provider value={{sendMessage: m}}>
        <div ref={domREF}>
            {props.children}
        </div>
    </Consonance_Ctx.Provider>
})

interface PerformanceMemory {
    usedJSHeapSize: number;
    totalJSHeapSize: number;
    jsHeapSizeLimit: number;
}

interface Performance extends globalThis.Performance {
    memory?: PerformanceMemory;
}
