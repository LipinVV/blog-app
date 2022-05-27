import {
  BaseSyntheticEvent,
  FC, useEffect, useMemo, useState,
} from 'react';
import { useParams } from 'react-router';
import { CommentType, PostType } from '../../types';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { Comment } from '../../components/Comment';
import { fetchPostComments, postUserComment } from '../../reducers/usersSlice';
import { appConsts } from '../../consts';
import { getComments, getLoading, getPosts } from '../../selectors';
import { LoadingPage } from '../../components/LoadingPage';
import './comments.scss';

export const Comments: FC = () => {
  const { id, postId } = useParams();
  const dispatch = useAppDispatch();
  const commentList = useAppSelector(getComments);
  const postsList = useAppSelector(getPosts);
  const loading = useAppSelector(getLoading);

  useEffect(() => {
    dispatch(fetchPostComments(Number(postId)));
  }, []);

  const [sendStatus, setSendStatus] = useState(false);
  const [newComment, setNewComment] = useState({
    name: '',
    email: '',
    text: '',
  });

  const [error, setError] = useState('');
  const currentPost = useMemo(() => postsList.find((post: PostType) => post.id === Number(postId)), [postId]);
  const { maxStrokeLength } = appConsts;
  const formFieldsHandler = (event: BaseSyntheticEvent, type: string) => {
    const { value } = event.target;
    if (type === 'email') {
      if (!value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
        setError('email is not valid!');
      } else {
        setError('');
      }
    }
    if (type === 'name') {
      if (value.length < maxStrokeLength) {
        setError('name is too short!');
      } else {
        setError('');
      }
    }
    if (type === 'text') {
      if (value.length < maxStrokeLength) {
        setError('text is too short!');
      } else {
        setError('');
      }
    }
  };

  const commentHandler = (event: BaseSyntheticEvent, key: string) => {
    const { value } = event.target;
    setNewComment({ ...newComment, [key]: value });
  };

  const postMessageHandler = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    setSendStatus(!sendStatus);
    dispatch(postUserComment({
      id: Number(id),
      postId: Number(postId),
      newComment: {
        id: Number(id),
        name: newComment.name,
        email: newComment.email,
        body: newComment.text,
      },
    }));
  };

  if (loading) return <LoadingPage />;

  return (
    <div className="comments">
      <section className="comments__current-post">
        <span className="comments__current-post-section">
          Post topic:
          <span className="comments__current-post-section-normal">{currentPost?.title}</span>
        </span>
        <span className="comments__current-post-section">
          Message:
          <span className="comments__current-post-section-normal">{currentPost?.body}</span>
        </span>
      </section>
      {commentList.map((comment: CommentType) => (
        <Comment
          key={comment.id}
          id={comment.id}
          name={comment.name}
          email={comment.email}
          body={comment.body}
        />
      ))}
      {!sendStatus
        ? (
          <button
            className="comments__add-comment-button"
            type="button"
            onClick={() => setSendStatus(!sendStatus)}
          >
            Add comment
          </button>
        )
        : (
          <form className="comments__form">
            <h4 className="comments__form-header">Post a comment</h4>
            <label htmlFor="name" className="comments__form-label">name</label>
            <input
              autoFocus
              id="name"
              className="comments__form-input"
              type="text"
              value={newComment.name}
              onChange={(event) => {
                commentHandler(event, 'name');
              }}
              onBlur={(event) => formFieldsHandler(event, 'name')}
            />
            <label htmlFor="text" className="comments__form-label">email</label>
            <input
              id="email"
              className="comments__form-input"
              type="email"
              value={newComment.email}
              onChange={(event) => {
                commentHandler(event, 'email');
              }}
              onBlur={(event) => formFieldsHandler(event, 'email')}
            />
            <label htmlFor="text" className="comments__form-label">text</label>
            <textarea
              id="text"
              className="comments__form-text-area"
              value={newComment.text}
              onChange={(event) => {
                commentHandler(event, 'text');
              }}
              onBlur={(event) => formFieldsHandler(event, 'text')}
            />
            <button
              className="comments__form-button"
              disabled={!Object.values(newComment).length || error.length > 0}
              type="submit"
              onClick={(event) => {
                postMessageHandler(event);
                setNewComment({ name: '', email: '', text: '' });
              }}
            >
              Send
            </button>
            {error && <span className="comments__form-error">{error}</span>}
          </form>
        )}
    </div>
  );
};
