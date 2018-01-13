import mongoose, {Schema} from 'mongoose';


const BlogSchema = new Schema({
    title: {
        type: String,
        required: 'Blogs must have titles',
    },
    body: {
        type: String,
        required: 'Blogs must have bodies',
    },
    created: {
        type: Date,
        default: Date.now,
    },
    tags: {
        type: [String],
        required: 'Blogs must contain at least on tag.',
    },
});

module.exports = mongoose.model('Blogs', BlogSchema);
