const mongoose = require('mongoose');

const heroSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },


    life: {
        type: Number,
        default: 100,
        min: 0,
    },

    attack: {
        type: Number,
        default: 1,
        min: 1,
    },

    defense: {
        type: Number,
        default: 1,
        min: 1,
    },

    xp: {
        type: Number,
        default: 0,
        min: 0,
    },

    gold: {
        type: Number,
        default: 0,
        min: 0,
    },


    lastAction: {
        type: String,
    },

    nextAction: {
        type: String,
    },

    trainings: [{
        type: mongoose.Types.ObjectId,
        ref: 'Training'
    }]
});

const Hero = mongoose.model('Hero', heroSchema);

module.exports = Hero;