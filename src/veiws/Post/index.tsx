import React, {useState} from 'react';
import './post.scss';
import {ACTION} from "../../actions";
import {useContext} from "react";
import {StoreContext} from "../../store";
import {Link} from "react-router-dom";
import {PostType} from "../../types";

export const Post = ({body, title, id, postId, userName}: PostType) => {
    const { dispatch } = useContext(StoreContext);
    const fetchPostComments = async (currentId: number) => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${currentId}`)
                .then((response) => response.json())
                .then((data) => dispatch({action: ACTION.LOAD_POST_COMMENTS, data: data}));
        } catch (error) {
            console.error(error);
        }
    }

    const [showingText, setShowingText] = useState(35);

    return (
        <div className='post'>
            <h4>{title}</h4>
            <span>{body.slice(0, showingText)}</span>
            {showingText === 35 ? <button onClick={() => setShowingText(body.length)}>open</button>
                :
                <button onClick={() => setShowingText(35)}>close</button>
            }
            <Link
                className='post__link'
                onClick={() => fetchPostComments(postId)}
                to={`/users/${userName}/${id}/${postId}/comments`}>Show comments
            </Link>
        </div>
    )
}