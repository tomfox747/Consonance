# Consonance
React Optimization and monitoring tool

## What is Consonance?
Consonance feeds realtime component data to a monitoring dashboard

## How does it work?
- Stream data to a development server, that exposes a monitoring app
- UI Runs in a separate browser window
- Consonance -> Proxy server -> Client.
- Pipe data using WebSocket

## Metrics
    - Component render time
    - Component memory usage
    - Component render count
    - Component lifecycle history
    - Component render history
    - Application tree/dom details

## APIs
    - Should be minimally invasive to development, add minimum code possible
    - Should be completely ignored / disabled on production [unknown how to do this yet]

## How to use
    - Start by wrapping App in <Consonance>
    - Then, use the useConsonanceObserver() hook along with a <Profiler/> to observe a component


### Features to implement
- Isolate a render frame, so that messages can be split into render groups.
- Display Tree structure of application, that updates live
- Track parent and children nodes, even on untracked components.
    - A tracked component, should still know about it's children and it's parent. Could I send a single DOM tree instance up with each message or render frame?
- If DOM available, use to generate a snapshot of the component at the time of message