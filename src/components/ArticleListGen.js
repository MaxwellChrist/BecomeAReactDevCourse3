import React from "react";
import {Link} from 'react-router-dom'

const ArticleListGen = ({articles}) => {
    return (
        <>
            {articles.map((item, index) => (
                <Link className="article-list-item" key={index} to={`/article/${item.name}`}>
                    <h3>{item.title}</h3>
                    <p>{item.content[0].substring(0, 150)}...</p>
                </Link>
            ))}
        </>
    )
}

export default ArticleListGen