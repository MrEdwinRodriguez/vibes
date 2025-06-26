const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ActionSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'users'},
    like: {type: Boolean, default: false},
    dislike: {type: Boolean, default: false},
}, {
    timestamps: true
});

module.exports = mongoose.model('Action', ActionSchema);