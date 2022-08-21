import express from 'express'
import bodyParser from 'body-parser'

const articleInfo = {
    'a': {
        upvotes: 0,
        comments: [],
    },
    'b': {
        upvotes: 0,
        comments: [],
    },
    'c': {
        upvotes: 0,
        comments: [],
    },
    'd': {
        upvotes: 0,
        comments: [],
    },
}

const app = express()

app.use(bodyParser.json())

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