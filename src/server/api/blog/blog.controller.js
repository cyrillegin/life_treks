import mongoose from 'mongoose';
import sanitizeBlog from './../../../modules/validators/blog';

const Blog = mongoose.model('Blogs');

exports.listAllBlogs = async function (req, res) {
    const result = await Blog.find({})
        .sort({created: -1})
        .limit(10);
    res.json(result);
};

exports.createBlog = function (req, res) {
    const entry = sanitizeBlog(req.body);
    entry.created = new Date();
    const newBlog = new Blog(entry);

    newBlog.save((err, blog) => {
        if (err) {
            res.send(err);
        } else {
            res.send('success');
        }
    });
};
