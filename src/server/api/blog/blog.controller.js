import mongoose from 'mongoose';
import sanitizeBlog from './../../../modules/validators/blog';

const Blog = mongoose.model('Blogs');

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

exports.listAllBlogs = async function (req, res) {
    const query = buildQuery(req.query);

    const result = await Blog.find(query)
        .sort({created: -1})
        .limit(10);
    res.json(result);
};

function buildQuery(params) {
    const query = {};
    if (params.blog !== undefined) {
        query._id = params.blog; // eslint-disable-line
    }
    if (params.date !== undefined) {
        const startDate = new Date(2018, 1, 1);
        startDate.setMonth(monthNames.indexOf(params.date));
        const endDate = new Date(2018, 1, 1);
        endDate.setMonth(monthNames.indexOf(params.date) + 1);
        query.created = {
            $gte: startDate,
            $lt: endDate,
        };
    }
    if (params.tag) {
        query.tags = params.tag;
    }
    return query;
}

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

exports.buildTree = async function (req, res) {
    console.log('Building tree');
    const result = await Blog.find();
    const payload = {
        dates: {},
        tags: {},
    };
    result.forEach((blog) => {
        const date = monthNames[new Date(blog.created).getMonth()];
        if (! (date in payload.dates)) {
            payload.dates[date] = [];
        }
        payload.dates[date].push({
            name: blog.title,
            id: blog.id,
        });

        blog.tags.forEach((tag) => {
            if (! (tag in payload.tags)) {
                payload.tags[tag] = [];
            }
            payload.tags[tag].push({
                name: blog.title,
                id: blog.id,
            });
        });
    });
    res.send(payload);
};
