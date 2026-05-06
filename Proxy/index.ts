import { WebSocketServer, WebSocket } from "ws"
import { IncomingMessage } from 'http'

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
    console.log(`WS listening on port -> ${4000}`)
})