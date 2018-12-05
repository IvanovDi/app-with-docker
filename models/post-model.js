const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment-uniq-scope');

const postSchema = mongoose.Schema(
    {
        title: { type: String, require: true },
        content: { type:String, require: true},
        author: { type: mongoose.Schema.Types.ObjectId, ref: 'user'}
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

postSchema.plugin(plugin, {
  model: 'post',
  field: 'postId',
  startAt: 1

});

module.exports = mongoose.model('post', postSchema);
