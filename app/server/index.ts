import express, { Request, Response } from 'express'
import bodyParser from 'body-parser'
import next from 'next'
import socketio from "socket.io"

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const port = process.env.PORT || 3000

app
  .prepare()
  .then(() => {
    const server = express()

    server.use(bodyParser())

    server.post('/chat', (req: Request, res: Response) => {
      console.log('body', req.body)
      postIO(req.body)
      res.status(200).json({ message: 'success' })
    })

    server.all('*', async (req: Request, res: Response) => {
      return handle(req, res)
    })

    const httpServer = server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })

    const io = socketio.listen(httpServer)

    io.on('connection', (socket: socketio.Socket) => {
      console.log('id: ' + socket.id + ' is connected')
    })

    const postIO = (data) => {
      io.emit('update-data', data)
    }
  })
  .catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
  })