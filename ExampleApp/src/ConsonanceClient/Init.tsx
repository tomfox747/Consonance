import React, { useRef, type  JSX, useEffect } from "react";
import { Consonance_Ctx } from "./Context";

/**
 * Component should be added at the root of an application, 
 * as a provider for interacting with the server websocket
 */
export const Consonance = React.memo((props:{children:JSX.Element}) => {
    
    const memoryRef = useRef({ max: 0, current: 0, percentUsage:0});
    const ws = useRef<WebSocket|null>(null)

    useEffect(() => {
        
        // setup websocket
        ws.current = new WebSocket(`ws://localhost:${4000}`);
        ws.current.onopen = () => {console.log("Consonance Connected");};
        ws.current.onmessage = (event) => {console.log(event)};
        ws.current.onclose = (e) => {console.log("Consonance Disconnected");};
        
        // handle ongoing memory usage metrics
        const memInt = setInterval(()=>{
            const p:Performance = performance
            memoryRef.current = {current: p.memory!.usedJSHeapSize, max: p.memory!.jsHeapSizeLimit, percentUsage: Number((p.memory!.usedJSHeapSize / ((p.memory!.jsHeapSizeLimit)/100)).toFixed(2))}
        }, 1000)

        return () => {
            ws.current?.close();
            clearInterval(memInt)
        };
    }, [])

    const m = (message:object) => {if(ws.current) ws.current.send(JSON.stringify({...memoryRef.current,...message}))}

    return <Consonance_Ctx.Provider value={{sendMessage: m}}>
        {props.children}
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
