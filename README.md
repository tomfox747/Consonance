# Consonance
React Optimization and monitoring tool

## What is Consonance?
Consonance feeds realtime component data to a monitoring dashboard

## How does it work?
- Via a webworker, feeds an output of data to a development server about connected components.
- UI Runs in a separate browser window
- Consonance -> Development Server -> Client.
- Realtime data from webworker will be streamed through the dev server and into the client using Sockets or other realtime tech

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

## npm run [cmd] --consonance
    - Will spin up the development server, could be used in conjunction with 
    - 