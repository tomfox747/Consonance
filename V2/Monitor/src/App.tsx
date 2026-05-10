import { useEffect, useRef, useState } from 'react'
import './App.css'

interface IFiberNode {
	actualDuration:number,
	actualStartTime:number,
	child?: IFiberNode|null,
	sibling?: IFiberNode|null
}

function App() {
  
	const wsRef = useRef<WebSocket|null>(null)

	const [fiberTree,setFiberTree] = useState<IFiberNode>(null)

	useEffect(() => {
		wsRef.current = new WebSocket('ws://localhost:4000')
		wsRef.current.onopen = () => {
            console.log("Connected to server");
        };

        wsRef.current.onmessage = (event) => {
            let tree = JSON.parse(event.data)
			console.log(tree)
			setFiberTree(tree)
        };

        wsRef.current.onclose = () => {
            console.log("Disconnected");
        };

        return() =>{
            wsRef.current?.close()
        }
	}, [])

	return <>
    
	</>
}

export default App
