import blog from './blog.controller';

export default function (app) {

    app.route('/blogs')
        .get(blog.listAllBlogs)
        .post(blog.createBlog);

    // app.route('/blogs/:blogId')
    //     .get(blog.readBlog)
    //     .put(blog.updateBlog)
    //     .delete(blog.deleteBlog);
}
