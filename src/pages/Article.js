import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ArticleContent from '../components/ArticleContent'
import ArticleListGen from '../components/ArticleListGen'
import Error from './Error'
import CommentListGen from '../components/CommentsListGen'
import Upvotes from '../components/Upvotes'
import CommentAdder from '../components/CommentAdder'

const Article = () => {
    const params = useParams()
    const [articleInfo, setArticleInfo] = useState({ upvotes: 0, comments: [] })
    useEffect(() => {
        const fetchData = async() => {
            const result = await fetch(`http://localhost:8000/api/articles/${params.name}`)
            const resultBody = await result.json()
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
            <Upvotes name={params.name} upvotes={articleInfo.upvotes} setArticleInfo={setArticleInfo} />
            {article.content.map((par, key) => (
                <p key={key}>{par}</p>
            ))}
            <CommentListGen comments={articleInfo.comments} />
            <CommentAdder name={params.name} setArticleInfo={setArticleInfo} />
            <h3>Other Articles</h3>
            <ArticleListGen articles={otherArticles} />
        </>
    )
}

export default Article