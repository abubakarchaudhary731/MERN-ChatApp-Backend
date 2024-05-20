const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./Routes/UserRoutes');
const chatRoutes = require('./Routes/ChatRoutes');

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

app.get('/', (req, res) => {
    res.send("Chat Application API's is Running Successfully");
})

app.use('/api/user', userRouter)
app.use('/api/chat', chatRoutes)

// ****************** Connect to Database ******************** //
const PORT = process.env.PORT || 5000;
const URL = process.env.MONGODB_URL;

mongoose.connect(URL).then(() => {

    console.log("Database Connected Successfully");

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`)
    });

}).catch((error) => {
    console.log(error);
})