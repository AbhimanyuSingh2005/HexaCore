const mongoose = require('mongoose');

const startupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    founders: {
        type: Array,
        required: true
    },
    industrySector:{
        type: String,
        required: true
    },
    associatedInnovations: {
        type: Array,
        required: true
    },
    associatedPatents: {
        type: Array,
        required: true
    },
    fundingStage: {
        type: String,
        required: true
    }

});