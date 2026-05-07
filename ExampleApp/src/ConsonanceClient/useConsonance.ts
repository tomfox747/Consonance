import { useEffect, useRef } from "react";

export const useConsonance = (port?:number) => {

    const ws = useRef<WebSocket|null>(null)

    useEffect(() => {
        
        // connect to server
        ws.current = new WebSocket(`ws://localhost:${port??4000}`);

        ws.current.onopen = () => {
            console.log("Consonance Connected");
        };

        ws.current.onmessage = (event) => {
            // console.log(event)
        };

        ws.current.onclose = () => {
            console.log("Consonance Disconnected");
        };

        return () => {
            ws.current?.close();
        };
    }, [port])

    return (message:object) => ws.current ? ws.current.send(JSON.stringify(message)) : ()=>{console.log('Consonance not connected')}
}
