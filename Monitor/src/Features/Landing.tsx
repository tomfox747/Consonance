import React, { useState } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '../assets/vite.svg'
import heroImg from '../assets/hero.png'
import type { IConsonanceObserverMsg } from '../Models'
import { v4 as uuidv4 } from "uuid";

export const Landing = (props: {messages:IConsonanceObserverMsg[]}) => {

    const [count, setCount] = useState(0)

    return <React.Fragment> <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Point you <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Messages</h2>
          <p>Your application development data</p>
          {props.messages.map(x => {
            return <div key={uuidv4()} style={{display:'flex', gap: 5}}>
              <div style={{width:'100px', border: 'solid white'}}>{x.component}</div>
              <div style={{width: '500px', border: 'solid white'}}>
                <div>Render Count - {x.renderCount}</div>
                <div>Mem - {x.metrics.mem_percentUsage}%</div>
                <div>Timestamp - {`${new Date(Number(x.metrics.timestamp)).getHours()}:${new Date(Number(x.metrics.timestamp)).getMinutes()}:${new Date(Number(x.metrics.timestamp)).getSeconds()}:${new Date(Number(x.metrics.timestamp)).getMilliseconds()}`}</div>
                <div>Render Duration - {x.metrics.actualDuration}</div>
                <div>Render Phase - {x.metrics.phase}</div>
              </div>
            </div>
          })}
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </React.Fragment>
}