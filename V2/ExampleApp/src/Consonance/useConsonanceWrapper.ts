import { useEffect, useRef, useState } from "react"
import type { IFiberNode } from "./IFibernode"

export const useConsonance = (DA:string) => {

    const captureRef = useRef<null|object>(null)
    const wsRef = useRef<null|WebSocket>(null)
    const [fiberNode, setFiberNode] = useState<null|IFiberNode>(null)

    useEffect(() => {
        wsRef.current = new WebSocket(`ws://localhost:${4000}`);
        wsRef.current.onopen = () => {console.log("Consonance Connected");};
        // wsRef.current.onmessage = (event) => {console.log(event)};
        wsRef.current.onclose = () => {console.log("Consonance Disconnected");};
    }, [])

    useEffect(() => {
        if(captureRef.current) {
            let y = Object.keys(captureRef.current).find(x=>x.startsWith('__reactFiber$'))
            setFiberNode({...captureRef.current[y]})
        }
    },[DA])

    useEffect(() => {
        if(fiberNode && wsRef.current.readyState===1) {
            let payload: object = {}
            payload = processFiber(fiberNode, payload)
            wsRef.current.send(JSON.stringify(payload))
        }

    }, [fiberNode])

    const processFiber = (fiber: IFiberNode, payload: any) => {
        
        const { elementType } = fiber;
        
        if(typeof elementType === 'string'){
            payload.elementType = elementType
        }

        if(typeof elementType === 'function'){
            payload.elementType = elementType.name
        }

        payload.actualDuration = fiber.actualDuration
        payload.actualStartTime = fiber.actualStartTime

        if(fiber.sibling) {
            payload.sibling = processFiber(fiber.sibling, {})
        }

        if(fiber.child) {
            payload.child = processFiber(fiber.child, {})
        }

        return payload
    }

    return {
        captureRef,
        fiberNode
    }
}
