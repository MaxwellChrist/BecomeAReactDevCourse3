import React from 'react'
import ArticleListGen from '../components/ArticleListGen'
import ArticleContent from '../components/ArticleContent'


const ArticleList = () => {
    return (
        <>
            <h1>Articles</h1>
            <ArticleListGen articles={ArticleContent} />
        </>
    )
}

export default ArticleList