import {useState} from 'react';
import {Link} from "react-router-dom";
import {PostType} from "../../types";
import {fetchPostComments} from "../../reducers/usersSlice";
import {useAppDispatch} from "../../hooks/hooks";
import './post.scss';

export const Post = ({body, title, id, postId, userName}: PostType) => {
    const dispatch = useAppDispatch();

    const valueToSliceTheText = 50;
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
                to={`/users/${userName}/${id}/${postId}/comments`}>To comments
            </Link>
        </div>
    )
}