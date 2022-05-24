import {useState} from 'react';
import {Link} from "react-router-dom";
import {PostType} from "../../types";
import {fetchPostComments} from "../../reducers/usersSlice";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../store";
import './post.scss';

export const Post = ({body, title, id, postId, userName}: PostType) => {
    const dispatch = useDispatch<AppDispatch>();

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
                onClick={() => dispatch(fetchPostComments(postId))}
                to={`/users/${userName}/${id}/${postId}/comments`}>Show comments
            </Link>
        </div>
    )
}