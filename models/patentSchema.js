const mongoose = require('mongoose');

const patentSchema = new mongoose.Schema({
    applicantname: {
        type: String,
        required: true
    },
    applicantnationalty: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    titleofinnovation: {
        type: String,
        required: true
    },
    innovatorname: {
        type: String,
        required: true
    },
    innovatornationality:{
        type: String,
        required: true
    },
    mobilenumber:{
        type: String,
        required: true
    },
    inventoraddress:{
        type : String,
        required: true
    },
    applicantmail:{
        type : String,
        required : true
    }
});

const Patent = mongoose.model('Patent', patentSchema);

module.exports = Patent;