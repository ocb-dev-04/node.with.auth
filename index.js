const express = require('express');
const mongoose =  require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// to use .env files config
require('dotenv/config');

// PARSER ALL REQ OR RES TO JSON TYPE
app.use(express.json());

// IMPORT ROUTES
const authRoute = require('./routes/auth');

// ROUTE MIDDLEWARE
app.use('/api/user', authRoute);

// CONNECT TO DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useUnifiedTopology: true },
    () => console.log('Connect to DB sucessful')
);


// START SERVER
const upServerMessage = () => console.log('We are online');
app.listen(process.env.SERVER_PORT, upServerMessage);
