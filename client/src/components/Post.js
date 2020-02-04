import React from 'react'



const Post = (props) => {
    return (
        <div className="post">
            <div>{props.title}</div>
            <div>{props.user}</div>
            <div>{props.text}</div>
            <div>{props.postDate}</div>

            
        </div>
    )
};

export default Post;