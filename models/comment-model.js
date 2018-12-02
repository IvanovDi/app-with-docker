const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        text: { type: String, require: true},
        author: { type: String, require: true },
        post: { type: String, require: true }
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