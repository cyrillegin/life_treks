import mongoose from 'mongoose';

const User = mongoose.model('User');

exports.attemptLogin = function (req, res) {
    User.find({}, (err, user) => {
        if (err) {
            res.send(err);
        }
        console.log('found something');
        console.log(user);
    });
};
