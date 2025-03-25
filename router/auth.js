const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

const router = express.Router();

const PORT = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'jwt ki key daal dena'; 

const User = require('../models/userSchema');

router.post('/register', async (req, res) => {
    try {
      const { name,username, password,role } = req.body;
      // console.log(name,username, password,role);
      // Check if user already exists
      const existingUser = await User.findOne({ username });
      // console.log(existingUser);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }
  
      // Hash password
      // const hashedPassword = await bcrypt.hash(password, 10);
      // Create and save new user
      const newUser = new User({name,username, password, role });
      await newUser.save();
  
      res.redirect('/login');
    } catch (error) {
      res.status(500).json({ message: 'Error signing up', error: error.message });
    }
  });

  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user
      const user = await User.findOne({ username });
      
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      
      if(user.password != password){
        console.log(user.password,password);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      res.redirect('/user_dashboard?id='+user._id);
      // Check password
      // const isPasswordValid = await bcrypt.compare(password, user.password);
      // if (!isPasswordValid) {
      //   return res.status(400).json({ message: 'Invalid credentials' });
      // }
  
      // // Generate JWT
      // const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
  
    } catch (error) {
      res.status(500).json({ message: 'Error signing in', error: error.message });
    }
  });
module.exports = router;