require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

require("./db/conn");
app.set('view engine', 'ejs');
app.use(express.static('public'));

const indexRouter = require("./router/index.js");
app.use(indexRouter);


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});