import React, {useState} from "react";

const CommentAdder = ({ name, setArticleInfo }) => {
    const [text, setText] = useState("")
    const [user, setUser] = useState("")

    const addComment = async() => {
        const result = await fetch(`http://localhost:8000/api/articles/${name}/add-comment`, {
            method: "post",
            body: JSON.stringify({username: user, text: text}),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        const body = await result.json()
        setArticleInfo(body)
        setText("")
        setUser("")
    }

    return (
        <div id="add-comment-form">
            <h3>Add a Comment</h3>
            <label>
                Name:
                <input type="text" value={user} onChange={(e) => setUser(e.target.value)} />
            </label>
            <label>
                Comment:
                <textarea rows="4" cols="50" value={text} onChange={(e) => setText(e.target.value)}/>
            </label>
            <button onClick={() => addComment()}>Add Comment</button>
        </div>
    )
}

export default CommentAdder