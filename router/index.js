const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/userSchema');
const Patent = require('../models/patentSchema');
const Research = require('../models/researchSchema');
const Startup = require('../models/startupSchema');
const Innovation = require('../models/innovationSchema');

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;