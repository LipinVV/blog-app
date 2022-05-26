import { useState } from 'react';
import { useParams } from 'react-router';
import { PostType, StateType, UserType } from '../../types';
import { Post } from '../../components/Post';
import { useAppSelector } from '../../hooks/hooks';
import './posts.scss';

export const Posts = ({ username }: UserType) => {
  const { id } = useParams();
  const [numberOfPosts, setNumberOfPosts] = useState(3);
  const postLists = useAppSelector((state: StateType) => state.posts);
  const posts = postLists.slice(0, numberOfPosts);

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
      {numberOfPosts === 3
        ? <button className="posts__button-show-all" type="button" onClick={() => setNumberOfPosts(postLists.length)}>Show all</button>
        : <button className="posts__button-hide-all" type="button" onClick={() => setNumberOfPosts(3)}>Hide all</button>}
    </div>
  );
};
