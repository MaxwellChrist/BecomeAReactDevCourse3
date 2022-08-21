import React from 'react'
import { useParams } from 'react-router-dom'
import ArticleContent from '../components/ArticleContent'

const Article = () => {
    const params = useParams()
    const article = ArticleContent.find(item => item.name === params.name)
    if (!article) return <h1>Article doesn't exist</h1>
    return (
        <>
            <h1>This is the {article.title} article</h1>
            {article.content.map((par, key) => (
                <p key={key}>{par}</p>
            ))}
        </>
    )
}

export default Article