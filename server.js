require('dotenv').config()
const path = require('path')

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { readdirSync } = require('fs')
const connectDB = require('./Config/db')

const { createServer } = require('node:http')
const { Server } = require('socket.io')

const app = express()

connectDB()

app.use(morgan("dev"))
app.use(cors())
app.use(express.json())

const server = createServer(app)

const io = new Server(server)

io.on('connection', (socket) => {
    console.log('user connected')

    socket.on('chat:message', (msg) => {
        console.log('recieved', JSON.stringify(msg, null, 2))
    })
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'))
})


readdirSync('./Routes').map((r) => app.use('/api', require('./Routes/' + r)))

const PORT = process.env.PORT || 5555

server.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`)
})