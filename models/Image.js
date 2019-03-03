const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//SCHEMA

const ImageSchema = new Schema({
    image: {
        type: String,
        required: true
        },
    title: {
        type: String,
        required: true
    },
    style: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
});

mongoose.model('images', ImageSchema);