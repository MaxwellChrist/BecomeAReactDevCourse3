import express from 'express';
import bodyParser from 'body-parser';
import { MongoClient } from 'mongodb';

const app = express();
app.use(bodyParser.json());
app.use((req, res, next) => { res.header("Access-Control-Allow-Origin", "*"); next(); })
app.use((req, res, next) => { res.header("Access-Control-Allow-Headers","*"); next(); })

const setupDB = async (item, errorResponse) => {
    try {
        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true });
        const db = client.db('my-blog');

        await item(db)
    
        client.close();
    } catch (error) {
        errorResponse.status(500).json({ message: 'Error connecting to db', error });
    }
}

app.get('/api/articles/:name', async (req, res) => {
    setupDB(async (item) => {
        const articleName = req.params.name;
        const articleInfo = await item.collection('articles').findOne({ name: articleName })
        res.status(200).json(articleInfo);
    }, res)
})

app.post('/api/articles/:name/upvote', async (req, res) => {
    setupDB(async (item) => {
        const articleName = req.params.name;
        const articleInfo = await item.collection('articles').findOne({ name: articleName });
        await item.collection('articles').updateOne({ name: articleName }, {
            '$set': {
                upvotes: articleInfo.upvotes + 1,
            },
        });
        const updatedArticleInfo = await item.collection('articles').findOne({ name: articleName });
        res.status(200).json(updatedArticleInfo)
    }, res)
});

app.post('/api/articles/:name/add-comment', (req, res) => {
    const { username, text } = req.body;
    const articleName = req.params.name;

    setupDB(async (item) => {
        const articleInfo = await item.collection('articles').findOne({name: articleName})
        await item.collection('articles').updateOne({ name: articleName}, {
            '$set': {
                comments: articleInfo.comments.concat({text})
            },
        })
        const updatedArticleInfo = await item.collection('articles').findOne({name: articleName})
        res.status(200).json(updatedArticleInfo)
    }, res)
});

app.listen(8000, () => console.log('Listening on port 8000'));