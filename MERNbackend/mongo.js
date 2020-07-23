const MongoClient = require('mongodb').MongoClient;

const url = '[your database connection here]';


const createHistory = async (req, res, next) => {
    const newHistory = {
        order: req.body
    };
    const client = new MongoClient(url);

    try {
        await client.connect();
        const db = client.db(); // default url
        const result = db.collection('history').insertOne(newHistory);
    } catch (error) {
        return res.json({message: 'Could not store data'});
    }
    client.close();
    res.json(newHistory);
};

const getHistory = async (req, res, next) => {
    const client = new MongoClient(url);

    let history;

    try {
        await client.connect();
        const db = client.db(); // default url
        history = await db.collection('history').find().toArray();
    } catch (error) {
        return res.json({message: 'Could not get data'});
    }
    client.close();

    res.json(history)
};

const deleteHistory = async (req, res, next) => {
    const client = new MongoClient(url);

    console.log(req.body);

    try {
        await client.connect();
        const db = client.db(); // default url
        history = await db.collection('history').deleteOne(req.body.data);
    } catch (error) {
        return res.json({message: 'Could not get data'});
    }
    client.close();

    res.json(history)
}

exports.createHistory = createHistory;
exports.getHistory = getHistory;
exports.deleteHistory = deleteHistory;
