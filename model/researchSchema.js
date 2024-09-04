const mongoose = require('mongoose');

const researchSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    researchersInvolved: {
        type: Array,
        required: true
    },
    institution: {
        type: String,
        required: true
    },
    funding: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        required: true
    }
});

const Research = mongoose.model('Research', researchSchema);

module.exports = Research;