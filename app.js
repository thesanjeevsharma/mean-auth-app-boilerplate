const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const mongoose = require('mongoose');
const logger = require('morgan');

const dbconfig = require('./config/db.config');

const app = express();

// DB CONNECTION
mongoose
    .connect(dbconfig.MongoURI, { useNewUrlParser : true })
    .then(() => {
        console.log('Connected to DB...');
    })
    .catch((err) => {
        console.error(err);
    })

// ROUTES IMPORT
const usersRoute = require('./routes/users.router');

// MIDDLEWARES
app.use(express.static(path.join(__dirname,'public')));
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);
app.use(logger('dev'));

// ROUTING
app.use('/users', usersRoute);

// SERVER SETTING
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server started on ${PORT}`);
})