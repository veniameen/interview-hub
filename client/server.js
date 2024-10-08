const express = require('express')
const path = require('path')
const next = require('next')
const http = require('http')
const { createProxyMiddleware } = require('http-proxy-middleware')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const fs = require('fs/promises')
const { Server } = require('socket.io')

const dev = process.env.NODE_ENV !== 'production'
const hostname = 'localhost'
const port = process.env.PORT || 3000

const languageConfigs = {
  javascript: {
    fileExtension: 'js',
    command: 'node',
  },
  python: {
    fileExtension: 'py',
    command: 'python',
  },
}

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  const app = express()
  const server = http.createServer(app)

  const io = new Server(server)

  io.on('connection', (socket) => {
    console.log(socket)
  })

  app.use(bodyParser.json())

  app.use(
    '/api',
    createProxyMiddleware({
      target: process.env.API_URL || 'http://localhost:5000',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    }),
  )

  app.get('/languages', (_, res) => {
    res.json(Object.keys(languageConfigs))
  })

  app.post('/run-code', async (req, res) => {
    const { language, code } = req.body
    const config = languageConfigs[language]

    if (!config) {
      throw new Error(`Unsupported language: ${language}`)
    }

    const workDir = '/tmp'
    const filename = `Main.${config.fileExtension}`

    const folderPath = path.join(__dirname, workDir)
    await fs.mkdir(folderPath, { recursive: true })

    const filePath = path.join(folderPath, filename)

    try {
      await fs.writeFile(filePath, code)

      exec(`${config.command} ${filePath}`, (error, stdout, stderr) => {
        if (error) {
          console.error('Error executing code:', error)
          return res.status(500).json({ error: error.message, stderr })
        }
        res.json({ output: stdout, error: stderr })
      })
    } catch (error) {
      console.error('Error executing code:', error)
      res.status(500).json({ error: error.message })
      throw error
    } finally {
      await fs.unlink(filePath).catch(console.error)
    }
  })

  app.use('/_next', express.static(path.join(__dirname, '.next')))

  app.all('*', (req, res) => {
    return handle(req, res)
  })

  app.listen(port, (err) => {
    if (err) throw err
    console.log(`> Ready on http://${hostname}:${port}`)
  })
})
