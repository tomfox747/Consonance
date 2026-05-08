import { Profiler, useEffect, useRef, useState } from 'react'
import './App.css'
import { Consonance } from './ConsonanceClient/Init'
import { useConsonanceObserver } from './ConsonanceClient/useConsonanceObserver'


function App() {

  const ref = useRef<Record<string,object>|null>(null)

  useEffect(() => {
    if(ref.current){
      const fibKey = Object.keys(ref.current!).find(k=>k.startsWith('__reactFiber$'))
      if(fibKey) console.log(String(ref.current[fibKey]))
    }
  })

  return <div ref={ref}>
    <div>
      <button>Kick me</button>
    </div>
  </div>

  // return (
  //   <Consonance>
  //     <C/>
  //   </Consonance>
  // )
}

const C = () => {

  const [count, setCount] = useState(0)
  
  const co = useConsonanceObserver('C2',{count:count})
  
  return <Profiler key={'prof'} {...co}><C2 count={count} setCount={setCount}/></Profiler>
}

const C2 = (props: {count:number, setCount(v:number):void}) => {

  return <div>
    <C3 count={props.count} setCount={props.setCount}/>
    <C4 id={'C4btn1'} count={props.count} setCount={props.setCount}/>
  </div>
}

const C3 = (props: {count:number, setCount(v:number):void}) => {
  const co = useConsonanceObserver('C3btn')
  return <Profiler {...co}><button onClick={()=>props.setCount(props.count+1)}>Increment</button></Profiler>
}

const C4 = (props: {id:string, count:number, setCount(v:number):void}) => {

  const co = useConsonanceObserver(props.id)

  return <Profiler {...co}>
    <button onClick={()=>props.setCount(props.count+1)}>Increment</button>
  </Profiler>
}

export default App
