const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        age: Number
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

module.exports = mongoose.model('user', userSchema);
