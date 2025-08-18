const mongoose =  require('mongoose');


const { Schema } = mongoose;

const uploadSchema = new Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    filename: {
        type: String,
        required: true
    },
    filePath: {
        type: String
    },
    uploadTime: {
        type: Date,
        default: Date.now
    },
    expiryTime: {
        type: Date
    },
    download_count: {
        type: Number,
        default: 0
    },
    sender_email: {
        type: String,
        required: true
    },
    reviever_email: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Upload', uploadSchema);