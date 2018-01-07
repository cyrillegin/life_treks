function assert(condition, message) {
    if (!condition) {
        throw `Assertion failed: ${message}`;
    }
}

const titleEntry = 'Hello World!';

// eslint-ignore-line
const bodyEntry = 'Welcome, my name is Cyrille Gindreau. I’m currently going to school for my second degree in computer science, my first was in animation. Over the past few years I’ve been coding more and more and more and thought “Man, I need a spot to start putting all of this knowledge.” Which brings us here. The first goal of this site is to develop and maintain an online presence using current technologies that the industry is using. The second goal is to create a kind of repository of intro to mid-level tutorials on the different frameworks and libraries that I come across. That’s it for now, thanks for reading!';// eslint-ignore-line
const tagsEntry = ['hello', 'intro', 'greeting'];

const time = Date.now();

assert(typeof titleEntry === 'string', 'entry string');
assert(titleEntry.length < 20, 'entry length');

assert(typeof bodyEntry === 'string', 'body string');

assert(Array.isArray(tagsEntry), 'tags isnt array');
assert(tagsEntry.length > 0);
tagsEntry.forEach((tag) => {
    assert(typeof tag === 'string', 'tag isnt string');
    assert(tag.length < 10, 'tag too long');
});

let str = `db.blogs.insert({title:"${titleEntry}"`;
str += `, date:${time}`;
str += `, content:"${bodyEntry}"`;
str += ', tags:[';
tagsEntry.forEach((tag) => {
    str += `"${tag}",`;
});
str = str.slice(0, -1);
str += `], id:${time}})`;


console.log('');
console.log(str);
console.log('');
