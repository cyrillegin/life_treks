import mongoose from 'mongoose';

const Blog = mongoose.model('Blogs');

exports.listAllBlogs = function (req, res) {
    Blog.find({}, (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json(blog);
    });
};

exports.createBlog = function (req, res) {
    const newBlog = new Blog(req.body);
    newBlog.save((err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json(blog);
    });
};

exports.readBlog = function (req, res) {
    Blog.findById(req.params.blogId, (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json(blog);
    });
};

exports.updateBlog = function (req, res) {
    Blog.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json(blog);
    });
};

exports.deleteBlog = function (req, res) {
    Blog.remove({
        _id: req.params.blogId,
    }, (err, blog) => {
        if (err) {
            res.send(err);
        }
        res.json({message: 'Blog successfully deleted'});
    });
};
