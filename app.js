require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

require("./db/conn");

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const indexRouter = require("./router/index.js");
const authRouter = require("./router/auth.js");
app.use(indexRouter);
app.use(authRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});