import mongoose from 'mongoose';

const User = mongoose.model('User');

exports.attemptLogin = function (req, res) {
    console.log('Post request to attempt Login.');
    console.log(req.body);
    // Use this to create new users.
    if (req.body.new !== undefined) {
        console.log('creating a new user.');
        try {
            const newUser = {
                username: req.body.username,
                password: req.body.password,
            };
            const insertedUser = new User(newUser);
            insertedUser.save((err, user) => {
                if (err) {
                    console.log('an error occured.');
                    console.log(err);
                    res.send('error');
                    return;
                }
                console.log('User inserted.');
                console.log(user);
                res.send('success');
                return;
            });
        } catch (e) {
            console.log('error inserting into database.');
            console.log(e);
            res.send('error');
            return;
        }
    } else {
        // Else try logging in.
        try {
            const userToFind = {
                username: req.body.username,
                password: req.body.password,
            };
            User.find(userToFind, (err, user) => {
                if (err) {
                    console.log('an error has occured');
                    console.log(err);
                    res.send('error');
                    return;
                }
                console.log('found something');
                console.log(user);
                res.send(user);
                return;
            });
        } catch (e) {
            console.log('an error occured');
            console.log(e);
            res.send('error');
            return;
        }
    }
};

exports.getUsers = function (req, res) {
    console.log('getting users');
    try {
        User.find({}, (err, user) => {
            console.log('success');
            res.send(user);
            return;
        });
    } catch (e) {
        console.log('there was an error.');
        console.log(e);
        res.send('error');
        return;
    }
};