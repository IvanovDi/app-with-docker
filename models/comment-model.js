const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        text: { type: String, require: true},
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        post: { type: mongoose.Schema.Types.ObjectId, ref: 'post' }
    },
    {
        versionKey: false,
        timestamps: true,
        toJSON: {
            virtuals: true,
            transform: (doc, ret) => {
                delete ret._id;
                delete ret.__v; 
                return ret;
            }
        }
    }
);

module.exports = mongoose.model('comment', commentSchema);