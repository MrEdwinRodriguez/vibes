const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
	user: { type: Schema.Types.ObjectId, ref: 'users'},
	text: {type: String, required: true},
	name: {type: String },
    actions: [{type: Schema.Types.ObjectId, ref: 'actions'}],
}, {
    timestamps: true
});;

module.exports = mongoose.model('Comment', CommentSchema);