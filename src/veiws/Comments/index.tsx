import {useState} from 'react';
import {useContext} from "react";
import {StoreContext} from "../../store";
import {Comment} from "../Comment";
import {useParams} from "react-router";
import {ACTION} from "../../actions";
import './comments.scss';

export const Comments = () => {
    const {state, dispatch} = useContext(StoreContext);
    const comments = state.comments;
    const {postId} = useParams();
    const {id} = useParams();

    const [sendStatus, setSendStatus] = useState(false);
    const [newComment, setNewComment] = useState({
        name: '',
        email: '',
        text: ''
    });


    const postUserComment = async () => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/comments', {
                method: 'POST',
                body: JSON.stringify({
                    postId: postId,
                    title: newComment.name,
                    body: newComment.text,
                    userId: id,
                    email: newComment.email
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then((response) => response.json())
                .then(data =>{
                    dispatch({action: ACTION.UPDATE_POST_COMMENTS, data: [...comments, data]})
                });
        } catch (error) {
            console.error(error);
        }
    }

    const currentPost = state.posts.filter(post => post.id === Number(postId));

    console.log(currentPost)
    return (
        <div className='comments'>
            {comments.map(comment => {
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
                            postUserComment();
                        }}>Send
                    </button>
                </div>
            }
        </div>
    )
}