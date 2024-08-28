const express = require('express');
const dotenv = require('dotenv');
const {chats} = require('./data');
const connectDB = require('./config/db');
const colors = require('colors');
const userRoutes = require('./routes/userRoutes');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware');
const chatRoutes = require('./routes/chatRoutes');

dotenv.config();
connectDB();

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} ` .yellow.bold);
    });

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World');
    });

app.use('/api/user', userRoutes) 

app.use('/api/chat', chatRoutes);

app.use(notFound);
app.use(errorHandler);