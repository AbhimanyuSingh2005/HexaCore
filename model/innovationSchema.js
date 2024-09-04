const mongoose = require('mongoose');

const innovationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true,
        unique: true
    },
    innovatorsInvolved: {
        type: Array,
        required: true
    },
    associatedStartups: {
        type: Array,
        required: true
    },
    developmentStage: {
        type: String,
        required: true
    }
});