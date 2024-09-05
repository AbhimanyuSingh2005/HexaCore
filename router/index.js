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

router.get('/schemes', (req, res) => {
    res.render('schemes');
});

router.get('/patent', (req, res) => {
    res.render('patent');
});
router.get('/login', (req, res) => {
    res.render('login');
});
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.get('/chatbot', (req, res) => {
    res.render('chatbot');
});
router.get('/user_dashboard', (req, res) => {
    res.render('user_dashboard');
});
module.exports = router;