const mongoose = require('mongoose');

const commentSchema = mongoose.Schema(
    {
        text: { type:String, require: true},
        autor: {}
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