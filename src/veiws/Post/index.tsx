import {useState} from 'react';
import {ACTION} from "../../actions";
import {useContext} from "react";
import {StoreContext} from "../../store";
import {Link} from "react-router-dom";
import {PostType} from "../../types";
import './post.scss';

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
    const valueToSliceTheText = 32;
    const [showingText, setShowingText] = useState(valueToSliceTheText);

    return (
        <div className='post'>
            <h5 className='post__header'>{title}</h5>
            <p className='post__text'>{body.slice(0, showingText)}</p>
            {showingText === valueToSliceTheText ? <button className='post__button-open' onClick={() => setShowingText(body.length)}>show more...</button>
                :
                <button className='post__button-close'  onClick={() => setShowingText(valueToSliceTheText)}>Close</button>
            }
            <Link
                className='post__link'
                onClick={() => fetchPostComments(postId)}
                to={`/users/${userName}/${id}/${postId}/comments`}>Show comments
            </Link>
        </div>
    )
}