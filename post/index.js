const express = require('express');
const mongoose = require('mongoose');
const error = require('http-errors');
const Post = require('../models/post-model');

const router = express.Router();

router.get('/', async (req, res) => {
    const posts = await Post.find({}).populate('author');
    if (!posts) throw new error.NotFound();

    res.send(posts);
});

router.post('/', async (req, res) => {

    let post = new Post({
        title: req.body.title || 'none',
        content: req.body.content || 'none',
        author: new mongoose.Types.ObjectId(req.body.author)
    });

    post = await post.save();

    res.send(post);
});

// router.put('/:userId', async (req, res) => {
//     let user = await User.findByIdAndUpdate(req.params.userId, {
//         firstName: req.body.firstName || 'none',
//         lastName: req.body.lastName || 'none',
//         age: req.body.age || 0
//     }, {
//         new: true
//     });

//     res.send(user);
// });

// router.patch('/:userId', async (req, res) => {
//     try {
//         let user = await User.findByIdAndUpdate(req.params.userId, {
//             $set: req.body
//         }, {
//             new: true
//         });
//     } catch(err) {
//         res.send(400, new error.BadRequest());
//     }

//     res.send(user);
// });

// router.delete('/:userId', async (req, res) => {
//     let user = await User.findOneAndDelete({ _id: req.params.userId });
//     res.send(user);
// });

module.exports = router;
