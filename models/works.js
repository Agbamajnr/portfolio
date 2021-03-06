const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workSchema = new Schema(
    {
        title: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }
);

const Work = mongoose.model('Work', workSchema);

module.exports = Work;