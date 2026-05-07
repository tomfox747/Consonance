import './App.css'
import { useContext, useEffect, useRef } from 'react'
import { Consonance_Ctx } from './ConsonanceClient/Context'
import { Consonance } from './ConsonanceClient/Init'

function App() {

  return (
    <Consonance>
      <C/>
    </Consonance>
  )
}

const C = () => {

  const ref = useRef(null)

  const consonance = useContext(Consonance_Ctx)

  // useEffect(() => {
  //   setInterval(()=>{
  //     consonance.sendMessage({msg: 'hello there'})
  //   }, 500)

  //   return (()=>{})
  // }, [])

  useEffect(() => {
    console.log(ref.current)
  }, [])

  return <div ref={ref}><C2/></div>
}

const C2 = () => {

  return <C3/>
}

const C3 = () => {

  return <C4/>
}

const C4 = () => {

  return <div>Hello there</div>
}

export default App
