import express from 'express';
import { createServer } from 'http';
import { Server } from "socket.io";
import cors from 'cors';
const app = express();
const server = createServer(app);
app.use(cors());
const io = new Server(server, {
    cors: {
        origin: '*',
    }
})


app.get('/', (req, res) => {
    res.send('Hello World');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    //.emit is used to send message to the client
    socket.emit('me', `Hi , ${socket.id} , welcome to the app`);
    //socket.broadcast.emit is used to send message to all the clients except the sender
    socket.broadcast.emit('new-user', `New user joined ${socket.id}`);
    socket.on('message', (message) => {
        console.log(message);
        //socket.broadcast.emit is used to send message to all the clients except the sender
        socket.broadcast.emit('message', message);
    });

});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});

