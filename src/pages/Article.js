import React from 'react'
import { useParams } from 'react-router-dom'
import ArticleContent from '../components/ArticleContent'
import ArticleListGen from '../components/ArticleListGen'
import Error from './Error'

const Article = () => {
    const params = useParams()
    const article = ArticleContent.find(item => item.name === params.name)
    if (!article) return <Error />
    const otherArticles = ArticleContent.filter(item => item.name !== params.name)
    return (
        <>
            <h1>This is the {article.title} article</h1>
            {article.content.map((par, key) => (
                <p key={key}>{par}</p>
            ))}
            <h3>Other Articles</h3>
            <ArticleListGen articles={otherArticles} />
        </>
    )
}

export default Article