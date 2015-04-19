/**
 * Created by Tarik on 19.4.2015.
 */
mongoose = require('mongoose');

var OglasSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    cijena: {
        type: Number,
        required: true
    },
    description: {
        type: String
    },
    picture:{
        type: String
    }
});

module.exports = mongoose.model('Oglas', OglasSchema);