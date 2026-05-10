import { useState } from 'react'
import './App.css'
import { ConsonanceWrapper } from './Consonance/ConsonanceWrapper'

function App() {

    return <Parent key={'Parent'}/>
}

const Parent = () => {
    
    const [count, setCount] = useState(0)

    return <>
        <button onClick={()=>setCount(count+1)}>Kick me harder</button>
        <ConsonanceWrapper state={count.toString()}>
            <>
                <C/>
                <C2/>
            </>
        </ConsonanceWrapper>
    </>
}

const C = () => {

    const [pushcount, setPushcount] = useState(0)
    
    return <button onClick={()=>setPushcount(pushcount + 1)}>Push [{pushcount}]</button>
}

const C2 = () => {

    const [kickcount, setKickcount] = useState(0)

    return <button onClick={()=>setKickcount(kickcount+1)}>Kick me [{kickcount}]</button>
}

export default App
