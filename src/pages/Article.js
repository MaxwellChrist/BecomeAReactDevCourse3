import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArticleContent from '../components/ArticleContent'
import ArticleListGen from '../components/ArticleListGen'
import Error from './Error'
import CommentListGen from '../components/CommentsListGen'

const Article = () => {
    const params = useParams()
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(`http://localhost:8000/api/articles/${params.name}`)
            const resultBody = await result.json()
            console.log(resultBody)
            setArticleInfo(resultBody)
        }
        fetchData()
    }, [params.name])

    const article = ArticleContent.find(item => item.name === params.name)
    if (!article) return <Error />
    const otherArticles = ArticleContent.filter(item => item.name !== params.name)
    return (
        <>
            <h1>This is the {article.title} article</h1>
            <p>This post has been upvoted {articleInfo.upvotes} times</p>
            {article.content.map((par, key) => (
                <p key={key}>{par}</p>
            ))}
            <CommentListGen comments={articleInfo.comments} />
            <h3>Other Articles</h3>
            <ArticleListGen articles={otherArticles} />
        </>
    )
}

export default Article