import express from 'express'
import bodyParser from 'body-parser'
import { MongoClient } from 'mongodb'

// const articleInfo = {
//     'a': {
//         upvotes: 0,
//         comments: [],
//     },
//     'b': {
//         upvotes: 0,
//         comments: [],
//     },
//     'c': {
//         upvotes: 0,
//         comments: [],
//     },
//     'd': {
//         upvotes: 0,
//         comments: [],
//     },
// }

const app = express()

app.use(bodyParser.json())

app.get('/api/articles/:name', async (req, res) => {
    try {
        const articleName = req.params.name;

        const client = await MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true})
        const db = client.db('my-blog')
    
        const articleInfo = await db.collection('articles').findOne({name: articleName})
        res.status(200).json(articleInfo)
    
        client.close()
    } catch(err) {
        res.status(500).json({message: "Error connecting to database", err})
    }
})

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;
    articleInfo[articleName].upvotes += 1
    res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes} upvote(s)!`)
})

app.post('/api/articles/:name/add-comment', (req, res) => {
    const {username, text} = req.body
    const articleName = req.params.name;
    articleInfo[articleName].comments.push({username, text})
    res.status(200).send(articleInfo[articleName])
})

app.listen(3000, () => console.log("listening on port 3000"))