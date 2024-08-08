const express = require('express');
const app = express();
const morgan = require('morgan');
const userRouter = require('./routes/userRoutes');
const songRouter = require('./routes/songRoutes');
// const companyRouter = require('./routes/companyRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
// const jobRouter = require('./routes/jobRoutes');

// middleware to allow cross-origin requests from any domain
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

// middleware to parse the cookies
app.use(cookieParser());

// middleware to parse the request body
app.use(express.json());

// middleware to log the request
app.use(morgan('dev'));

// defining the endpoints or routes
app.use('/api/v1/users', userRouter);
app.use('/api/v1/songs', songRouter);
// app.use('/jobs', jobRouter);

// export the app module
module.exports = app;