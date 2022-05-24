import {useState} from 'react';
import {Comment} from "../Comment";
import {useParams} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {CommentType, PostType, StateType} from "../../types";
import {postUserComment} from "../../reducers/usersSlice";
import './comments.scss';

export const Comments = () => {
    const dispatch = useDispatch<AppDispatch>();

    const commentList = useSelector((state: StateType) => {
        return state.comments;
    });

    const postsList = useSelector((state: StateType) => {
        return state.posts;
    });

    const {postId} = useParams();
    const {id} = useParams();

    const [sendStatus, setSendStatus] = useState(false);
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        text: ''
    });

    const currentPost = postsList.filter((post: PostType) => post.id === Number(postId));


    return (
        <div className='comments'>
            {commentList.map((comment: CommentType) => {
                return (
                    <Comment key={comment.id} id={comment.id} name={comment.name} email={comment.email}
                             body={comment.body}/>
                )
            })}
            {!sendStatus ? <div>
                    <button type='button' onClick={() => setSendStatus(!sendStatus)}>Add comment</button>
                </div>
                :
                <div className='comments__form'>
                    Form
                    <label>name
                        <input
                            type='text'
                            value={newComment.name}
                            onChange={(event) => setNewComment({...newComment, name: event.target.value})}/>
                    </label>
                    <label>email
                        <input
                            type='text'
                            value={newComment.email}
                            onChange={(event) => setNewComment({...newComment, email: event.target.value})}/>
                    </label>
                    <label>text
                        <input
                            type='text'
                            value={newComment.text}
                            onChange={(event) => setNewComment({...newComment, text: event.target.value})}/>
                    </label>
                    <button
                        disabled={!newComment.text.length}
                        type='button'
                        onClick={() => {
                            setSendStatus(!sendStatus);
                            // postUserComment();
                            dispatch(postUserComment({
                                id: Number(id), postId: Number(postId), newComment: {
                                    id: Number(id),
                                    name: newComment.name,
                                    email: newComment.email,
                                    body: newComment.text
                                }
                            }));
                        }}>Send
                    </button>
                </div>
            }
        </div>
    )
}