require('dotenv').config();

const express = require('express');

const app = express();

require("./db/conn");

app.use(express.static('public'));

const indexRouter =require("./router/index");
app.use(indexRouter);

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});