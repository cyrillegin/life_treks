import mongoose from 'mongoose';
import sanitizeBlog from './../../../modules/validators/blog';

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
    const entry = sanitizeBlog(req.body);
    const newBlog = new Blog(entry);
    newBlog.save((err, blog) => {
        console.log(err);
        console.log(blog);
        if (err) {
            res.send(err);
        } else {
            res.send('success');
        }
    });
};

// exports.readBlog = function (req, res) {
//     Blog.findById(req.params.blogId, (err, blog) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(blog);
//     });
// };

// exports.updateBlog = function (req, res) {
//     Blog.findOneAndUpdate({_id: req.params.blogId}, req.body, {new: true}, (err, blog) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json(blog);
//     });
// };

// exports.deleteBlog = function (req, res) {
//     Blog.remove({
//         _id: req.params.blogId,
//     }, (err, blog) => {
//         if (err) {
//             res.send(err);
//         }
//         res.json({message: 'Blog successfully deleted'});
//     });
// };
