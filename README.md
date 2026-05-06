# Consonance
React Optimization and monitoring tool

## What is Consonance?
Consonance feeds realtime component data to a monitoring dashboard

## How does it work?
- Via a webworker or broadcast channel, feeds an output of data to a development server about connected components.
- UI Runs in a separate browser window
- Consonance -> Proxy server -> Client.
- Pipe data using broadcast channel between clients

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