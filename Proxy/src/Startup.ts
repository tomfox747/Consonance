import express, { Request, Response } from 'express'
import path from 'path'
import { WebSocketServer, WebSocket } from 'ws'
import { IncomingMessage } from 'http'

// REST server used to serve the UI and any other required data
export const InitRESTServer = () => {
    const clientServer = express()

    clientServer.use(express.static(path.join(__dirname, '../../Monitor/dist')))
    clientServer.get('/monitor',(req:Request, res:Response) => {
    res.sendFile(path.join(__dirname, '../../Monitor/dist/index.html'))
    })

    clientServer.listen(4001, () => {
        console.log("REST server listening on 4001")
    })
}


// Websocket used to stream data to the UI
export const InitWebsocket = () => {

    const wss = new WebSocketServer({ port: 4000 })

    wss.on('connection', (socket: WebSocket, request: IncomingMessage) => {

    console.log(`Client connected from origin -> ${JSON.stringify(request.headers.origin)}`)

    socket.on('message', (msg) => {
        console.log(msg.toString())
        // forward to all other clients
        wss.clients.forEach(client => {
        if (client !== socket && client.readyState === 1) {
            client.send(msg.toString())
        }
        })
    })
    })

    wss.on('listening',(socket:WebSocket) => {
        console.log(`Websocket listening on port -> ${4000}`)
    })
}