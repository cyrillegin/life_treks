import blog from './blog.controller';

export default function (app) {

    app.route('/blogs')
        .get(blog.listAllBlogs)
        .post(blog.createBlog);

    app.route('/blogTree')
        .get(blog.buildTree);
}
