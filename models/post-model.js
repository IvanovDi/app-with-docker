const mongoose = require('mongoose');

const postSchema = mongoose.Schema(
    {
        title: { type: String, require: true },
        content: { type:String, require: true},
        author: { type: String, require: true}
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

module.exports = mongoose.model('post', postSchema);
