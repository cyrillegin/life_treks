export default function sanitzieBlog(blog) {
    console.log('Sanitizing inputs.');
    const reg = RegExp(/^[a-zA-Z0-9 ]+$/);
    let tags;
    try {
        assert(reg.test(blog.blogTitle));
        assert(reg.test(blog.blogBody));
        tags = blog.blogTags.split(' ');
        tags.forEach((tag) => {
            assert(reg.test(tag));
        });
    } catch (e) {
        console.log('error in sanitation');
        console.log(e);
        return 'error';
    }

    console.log(blog);
    return {
        title: blog.blogTitle,
        body: blog.blogTitle,
        tags: tags,
    };
}

function assert(condition, message) {
    if (!condition) {
        throw message || "Assertion failed";
    }
}
