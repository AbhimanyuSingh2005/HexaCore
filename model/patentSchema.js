const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    inventorsInvolved: {
        type: Array,
        required: true
    },
    applicationStatus: {
        type: String,
        required: true
    },
    patentNumber: {
        type: String,
        required: true
    }
});