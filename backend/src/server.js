import express from 'express'
import bodyParser from 'body-parser'

const articleInfo = {
    'a': {
        upvotes: 0,
    },
    'b': {
        upvotes: 0,
    },
    'c': {
        upvotes: 0,
    },
    'd': {
        upvotes: 0,
    },
}

const app = express()

app.use(bodyParser.json())

app.post('/api/articles/:name/upvote', (req, res) => {
    const articleName = req.params.name;
    articleInfo[articleName].upvotes += 1
    res.status(200).send(`${articleName} now has ${articleInfo[articleName].upvotes} upvote(s)!`)
})

app.listen(3000, () => console.log("listening on port 3000"))