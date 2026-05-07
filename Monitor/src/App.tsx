import { useEffect, useRef, useState } from 'react'
import './App.css'
import { Landing } from './Features/Landing'
import type { IConsonanceObserverMsg } from './Models'

function App() {
    const ws = useRef<WebSocket|null>(null)

    const [messages, setMessages] = useState<IConsonanceObserverMsg[]>([])

    useEffect(() => {
    
        ws.current = new WebSocket("ws://localhost:4000");

        ws.current.onopen = () => {
            console.log("Connected to server");
        };

        ws.current.onmessage = (event) => {
            
            const Obj: IConsonanceObserverMsg = JSON.parse(event.data)
            if(!Obj) {
                console.log('Parse message failed')
                return
            }

            setMessages((prev) => {
                let msgs: IConsonanceObserverMsg[] = [...prev]
                if(msgs.length === 100) msgs = msgs.slice(0,99)
                return [Obj, ...msgs]
            })
        };

        ws.current.onclose = () => {
            console.log("Disconnected");
        };

        return() =>{
            ws.current?.close()
        }
    }, [])

    return (
        <Landing messages={messages}/>
    )
}

export default App
