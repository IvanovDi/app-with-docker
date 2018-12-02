const express = require('express');
const error = require('http-errors');
const User = require('../models/user-model');

const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find({});
    if (!users) throw new error.NotFound();

    res.send(users);
});

router.post('/', async (req, res) => {

    let user = new User({
        firstName: req.body.firstName || 'none',
        lastName: req.body.lastName || 'none',
        age: req.body.age || 0
    });

    user = await user.save();

    res.send(user);
});

router.put('/:userId', async (req, res) => {
    let user = await User.findByIdAndUpdate(req.params.userId, {
        firstName: req.body.firstName || 'none',
        lastName: req.body.lastName || 'none',
        age: req.body.age || 0
    }, {
        new: true
    });

    res.send(user);
});

router.patch('/:userId', async (req, res) => {
    try {
        let user = await User.findByIdAndUpdate(req.params.userId, {
            $set: req.body
        }, {
            new: true
        });
    } catch(err) {
        res.send(400, new error.BadRequest());
    }

    res.send(user);
});

router.delete('/:userId', async (req, res) => {
    let user = await User.findOneAndDelete({ _id: req.params.userId });
    res.send(user);
});

module.exports = router;
