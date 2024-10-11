import express from 'express'
import path from 'path'
import next from 'next'
import http from 'http'
import bodyParser from 'body-parser'
import { exec } from 'child_process'
import fs from 'fs/promises'
import { Server } from 'socket.io'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const languageConfigs = {
  javascript: {
    fileExtension: 'js',
    command: 'node',
    isExecutable: true,
  },
  typescript: {
    fileExtension: 'ts',
    command: 'npx ts-node',
    isExecutable: false,
  },
  python: {
    fileExtension: 'py',
    command: 'python3',
    isExecutable: true,
  },
  html: {
    fileExtension: 'html',
    isExecutable: false,
  },
  css: {
    fileExtension: 'css',
    isExecutable: false,
  },
}

const nextApp = next({ dev, hostname, port })
const handle = nextApp.getRequestHandler()

const socketCodeHandler = (io, socket) => {
  const updateCode = (data) => {
    socket.broadcast.to(socket.roomId).emit('code-update', data)
  }

  const removeCodeCursor = (data) => {
    socket.broadcast.to(socket.roomId).emit('code-cursor-remove', data)
  }

  const updateCodeCursors = (data) => {
    socket.broadcast.to(socket.roomId).emit('code-cursors-update', data)
  }

  socket.on('code-update', updateCode)
  socket.on('code-cursors-update', updateCodeCursors)
  socket.on('code-cursor-remove', removeCodeCursor)
}

nextApp.prepare().then(() => {
  const app = express()
  const server = http.createServer(app)
  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log('Новое соединение:', socket.handshake.query)

    const { roomId } = socket.handshake.query
    socket.roomId = roomId

    socket.join(roomId)

    socketCodeHandler(io, socket)

    socket.on('disconnect', () => {
      socket.leave(roomId)
    })
  })

  app.use(bodyParser.json())

  app.get('/languages', (_, res) => {
    res.status(200).json(languageConfigs)
  })

  app.post('/run-code', async (req, res) => {
    const { language, code } = req.body
    const config = languageConfigs[language]
    if (!config) {
      return res.status(400).json({ error: `Unsupported language: ${language}` })
    }

    const workDir = '/tmp'
    const filename = `Main.${config.fileExtension}`
    const folderPath = path.join(__dirname, workDir)
    const filePath = path.join(folderPath, filename)

    try {
      await fs.mkdir(folderPath, { recursive: true })
      await fs.writeFile(filePath, code)

      exec(`${config.command} ${filePath}`, async (error, stdout, stderr) => {
        if (error) {
          let errorMessage = error.message
          const errorTypeMatch = errorMessage.match(/(ReferenceError|TypeError|SyntaxError): .+/)
          const fileMatch = errorMessage.match(/at (.+):(\d+):(\d+)/)

          if (errorTypeMatch && fileMatch) {
            const errorType = errorTypeMatch[0]
            const lineNumber = fileMatch[2]

            errorMessage = `${errorType}\n Line: ${lineNumber}`
          }

          console.error('Error executing code:', error)
          return res.status(500).json({ error: errorMessage, stderr })
        }

        await fs.unlink(filePath).catch(console.error)
        res.json({ output: stdout, error: stderr })
      })
    } catch (error) {
      console.error('Error executing code:', error)
      await fs.unlink(filePath).catch(console.error)
      res.status(500).json({ error: error.message })
    }
  })

  app.use('/_next', express.static(path.join(__dirname, '.next')))

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
