import React from "react";

const Upvotes = ({name, upvotes, setArticleInfo}) => {
    const upvoteArticle = async () => {
        const result = await fetch(`http://localhost:8000/api/articles/${name}/upvote`, {
            method: 'post',
        });
        const body = await result.json();
        setArticleInfo(body);
    }
    return (
        <div id="upvote-section">
            <button id="upvote-button" onClick={() => upvoteArticle()}>Add upvote</button>
            <p>This post has been upvoted {upvotes} times</p>
        </div>
    )
}

export default Upvotes