const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordingSchema = new Schema ({
	user: { type: Schema.Types.ObjectId, ref: 'users'},
    recordingLink: {type: String},
    description: { type: String, required: true },
    rating: { type: Number }, //To be used to determing R/ PG etc
    title: {type: String }
},{
    timestamps: true
})

module.exports = mongoose.model("Recording", RecordingSchema);