import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { PostType, UserType } from '../../types';
import { Post } from '../../components/Post';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { appConsts } from '../../consts';
import { getPosts } from '../../selectors';
import { fetchUserPosts } from '../../reducers/usersSlice';
import './posts.scss';

export const Posts = ({ username }: UserType) => {
  const { id } = useParams();
  const { currentPosts } = appConsts;
  const postLists = useAppSelector(getPosts);
  const dispatch = useAppDispatch();
  const [numberOfPosts, setNumberOfPosts] = useState(currentPosts);
  const posts = postLists.slice(0, numberOfPosts);

  useEffect(() => {
    setNumberOfPosts(postLists.length);
  }, [postLists.length]);

  return (
    <div className="posts">
      <h4 className="posts__header">User posts</h4>
      {posts.map((post: PostType) => (
        <Post
          userName={username}
          id={Number(id)}
          title={post.title}
          body={post.body}
          postId={post.id}
          key={post.id}
        />
      ))}
      {numberOfPosts === currentPosts
        ? (
          <button
            className="posts__button-show-all"
            type="button"
            onClick={() => {
              dispatch(fetchUserPosts({ id: Number(id), limit: 10 }));
            }}
          >
            Show all
          </button>
        )
        : (
          <button
            className="posts__button-hide-all"
            type="button"
            onClick={() => {
              dispatch(fetchUserPosts({ id: Number(id), limit: 3 }));
            }}
          >
            Hide all
          </button>
        )}
    </div>
  );
};
