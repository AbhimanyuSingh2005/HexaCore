const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();

const User = require('../models/userSchema');
const Patent = require('../models/patenteSchema');
const Research = require('../models/researchSchema');
const Startup = require('../models/startupSchema');
const Research = require('../models/researchGroupSchema');

router.get('/', (req, res) => {
    res.render('index');
});

