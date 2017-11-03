import MongoClient from 'mongodb';

/*
schema
Blog: {
    title: "string"
    date: numb3r
    content: "string"
    tags: ["string"]
}
*/

let Blogs; //eslint-disable-line
let db;
let connecting = false;

const connect = async function () {
    if (connecting) {
        await new Promise((res) => setTimeout(res, 500));
        return await connect();
    }
    if (db) {
        return db;
    }

    // Connect
    console.log('Connecting to DB');
    connecting = true;
    db = await MongoClient.connect(process.env.MONGO_URL);

    await Promise.all([
        db.createCollection('blogs'),
    ]);

    Blogs = db.collection('blogs');

    await db.command({
        collMod: 'blogs',
    });

    await Blogs.createIndex({tags: 1}, {background: true}),

    console.log('Connected');
    connecting = false;

    return db;
};

export default {connect};
export {Blogs};
