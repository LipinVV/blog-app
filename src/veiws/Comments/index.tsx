import {FC, useState} from 'react';
import {useParams} from "react-router";
import {CommentType, PostType, StateType} from "../../types";
import {useAppDispatch, useAppSelector} from "../../hooks/hooks";
import {Comment} from "../../components/Comment";
import {postUserComment} from "../../reducers/usersSlice";
import './comments.scss';

export const Comments: FC = () => {
    const dispatch = useAppDispatch();

    const commentList = useAppSelector((state: StateType) => {
        return state.comments;
    });

    const postsList = useAppSelector((state: StateType) => {
        return state.posts;
    });

    const {postId} = useParams();
    const {id} = useParams();

    const [sendStatus, setSendStatus] = useState<boolean>(false);
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        text: ''
    });

    const [error, setError] = useState<string>('');
    const currentPost = postsList.find((post: PostType) => post.id === Number(postId));
    const formFieldsHandler = (value: string, type: string) => {
        if(type === 'email') {
            if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
                setError('email is not valid!');
            } else {
                setError('');
            }
        }
        if(type === 'name') {
            if(value.length < 5) {
                setError('name is too short!');
            } else {
                setError('');
            }
        }
        if(type === 'text') {
            if(value.length < 5) {
                setError('text is too short!');
            } else {
                setError('');
            }
        }
    };

    return (
        <div className='comments'>
            <section className='comments__current-post'>
                <span className='comments__current-post-section'>Post topic:
                    <span className='comments__current-post-section-normal'>{currentPost?.title}</span>
                </span>
                <span className='comments__current-post-section'>Message:
                   <span className='comments__current-post-section-normal'>{currentPost?.body}</span>
                </span>
            </section>
            {commentList.map((comment: CommentType) => {
                return (
                    <Comment
                        key={comment.id}
                        id={comment.id}
                        name={comment.name}
                        email={comment.email}
                        body={comment.body}
                    />
                )
            })}
            {!sendStatus ?
                <button
                    className='comments__add-comment-button'
                    type='button'
                    onClick={() => setSendStatus(!sendStatus)}>Add comment
                </button>
                :
                <form className='comments__form'>
                    <h4 className='comments__form-header'>Post a comment</h4>
                    <label htmlFor='name' className='comments__form-label'>name</label>
                    <input
                        autoFocus
                        id='name'
                        className='comments__form-input'
                        type='text'
                        value={newComment.name}
                        onChange={(event) => {
                            setNewComment({...newComment, name: event.target.value});
                            formFieldsHandler(event.target.value, 'name');
                        }}/>
                    <label htmlFor='text' className='comments__form-label'>email</label>
                    <input
                        id='email'
                        className='comments__form-input'
                        type='email'
                        value={newComment.email}
                        onChange={(event) => {
                            setNewComment({...newComment, email: event.target.value});
                            formFieldsHandler(event.target.value, 'email');
                        }}
                    />
                    <label htmlFor='text' className='comments__form-label'>text</label>
                    <textarea
                        id='text'
                        className='comments__form-text-area'
                        value={newComment.text}
                        onChange={(event) => {
                            setNewComment({...newComment, text: event.target.value});
                            formFieldsHandler(event.target.value, 'text');
                        }}/>
                    <button
                        className='comments__form-button'
                        disabled={!newComment.text.length || !newComment.name.length || !newComment.email.length || error.length > 0}
                        type='submit'
                        onClick={(event) => {
                            event.preventDefault();
                            setSendStatus(!sendStatus);
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
                    {error && <span className='comments__form-error'>{error}</span>}
                </form>
            }
        </div>
    )
}