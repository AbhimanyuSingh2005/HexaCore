const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const { authenticate } = require('../middlewares/authMiddleware');
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
router.get('/chatbot',async (req, res) => {
    res.redirect('/login');
});
router.get('/user_dashboard', async (req, res) => {
    try{
        const id = req.query.id;
        if(!id){
            res.redirect('/login');
        }
    
        const user = await User.findById( id );
        const patents = await Patent.find({applicantmail : user.username});
        // console.log(patents);
        if(!user){
            res.redirect('/login');
        }
        // console.log(patents[0].titleofinnovation);
        // patents.forEach((patent,index)=>{
        //     console.log(patent.titleofinnovation);
        // })
        res.render('user_dashboard',{name: user.name, role: user.role,no : patents.length ,patents : patents});
    }catch(err){
        console.log(err);
    }
    
});
router.get('/iprform', (req, res) => {
    res.render('ipr_form');
});
router.get('/startupform', (req, res) => {
    res.render('startup_form');
});

router.post('/iprform',async(req,res)=>{
    try{
        const {applicantname,applicantnationalty,address,titleofinnovation,innovatorname,innovatornationality,mobilenumber,inventoraddress,applicantmail}=req.body;
        // console.log(applicantname,applicantnationalty,address,titleofinnovation,innovatorname,innovatornationality,mobilenumber,inventoraddress,applicantmail);
        const patent = new Patent({applicantname,applicantnationalty,address,titleofinnovation,innovatorname,innovatornationality,mobilenumber,inventoraddress,applicantmail});
        await patent.save();
        res.redirect('/login');
    }catch(err){
        console.log(err);
    }
    
})
module.exports = router;