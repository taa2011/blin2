const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

const sourceDir = 'src'
const entryPoint = __dirname + '/' + sourceDir + '/index.html'

const port = 8080
const app = express()


const server = http.createServer(app)


const io = socketIO(server)

let storageOrders = []

console.log(entryPoint);

app.use(express.static(sourceDir));

app.get('/', (req, res) => {
	res.sendFile(entryPoint);
});

app.get('/view', (req, res) => {
	res.sendFile(entryPoint);
});


// socket
io.on('connection', socket => {
  console.log('New client connected')
  io.sockets.emit('orders', storageOrders)
  
  
  socket.on('change orders', (orders) => {
    
    console.log('orders ', orders)
    storageOrders = orders
    

    io.sockets.emit('orders', storageOrders)
  })
  
  
  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

 server.listen(port, () => console.log(`Listening on port ${port}`))