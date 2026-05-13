import { useState } from 'react'
import './App.css'
import { ConsonanceWrapper } from './Consonance/ConsonanceWrapper'
import { useConsonanceSubscriber } from './Consonance/useConsonanceWrapper'

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
    
    useConsonanceSubscriber(pushcount.toString())

    return <button onClick={()=>setPushcount(pushcount + 1)}>C - Push [{pushcount}]</button>
}


const C2 = () => {

    return <C2_2/>
}

const C2_2 = () => {
    const [kickcount, setKickcount] = useState(0)

    useConsonanceSubscriber(kickcount.toString())

    if(kickcount %2 === 0) {
        return <div>
            <div>
                <div>
                    <div>Hello There</div>
                    <button onClick={()=>setKickcount(kickcount+1)}>C2_2 Kick me [{kickcount}]</button>
                </div>
            </div>
        </div>
    }

    return <button onClick={()=>setKickcount(kickcount+1)}>C2_2 Kick me [{kickcount}]</button>
}

export default App
