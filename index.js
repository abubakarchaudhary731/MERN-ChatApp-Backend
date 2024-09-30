const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./Routes/UserRoutes');
const chatRoutes = require('./Routes/ChatRoutes');
const messageRoutes = require('./Routes/MessageRoutes');

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.get('/', (req, res) => {
    res.send("Chat Application API's is Running Successfully");
})

app.use('/api/user', userRouter)
app.use('/api/chat', chatRoutes)
app.use('/api/message', messageRoutes)

// ****************** Connect to Database ******************** //
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {

    console.log("Database Connected Successfully");

}).catch((error) => {
    console.log(error);
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
});

const io = require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.Front_End_URL,
    },
});

io.on('connection', (socket) => {
    console.log("Connected to socket.io");

    socket.on('setup', (user) => {
        socket.join(user._id);
        socket.emit('connected');
    });

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;

        if (!chat.users) {
            return console.log("Chat Users not defined");
        }
        chat.users.forEach(user => {
            if (user._id == newMessageRecieved.sender._id) {
                return;
            }

            io.to(user._id).emit("message received", newMessageRecieved);
        });
    });
});