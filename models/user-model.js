const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-uniq-scope');

const userSchema = mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        age: Number,
        posts: { type: mongoose.Schema.Types.ObjectId, ref: 'post' }
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

const plugin = autoIncrement.getPlugin(mongoose.connection);

userSchema.plugin(plugin, {
  model: 'user',
  field: 'userId',
  startAt: 1

});

module.exports = mongoose.model('user', userSchema);
