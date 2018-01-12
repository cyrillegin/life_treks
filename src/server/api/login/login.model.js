import mongoose, {Schema} from 'mongoose';

const UserSchema = new Schema({
    username: {
        type: String,
        required: 'A user must have a name.',
    },
    password: {
        type: String,
        required: 'A user must have a password',
    },
});

module.exports = mongoose.model('User', UserSchema);
