import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostType } from '../../types';
import { appConsts } from '../../consts';
import './post.scss';

export const Post = ({
  body, title, id, postId, userName,
}: PostType) => {
  const { valueToSliceTheText } = appConsts;
  const [showingText, setShowingText] = useState(valueToSliceTheText);

  return (
    <div className="post">
      <h5 className="post__header">{title}</h5>
      <p className="post__text">{body.slice(0, showingText)}</p>
      {showingText === valueToSliceTheText ? (
        <button
          type="button"
          className="post__button-open"
          onClick={() => setShowingText(body.length)}
        >
          show more...
        </button>
      )
        : (
          <button
            type="button"
            className="post__button-close"
            onClick={() => setShowingText(valueToSliceTheText)}
          >
            Close
          </button>
        )}
      <Link
        className="post__link"
        to={`/users/${userName}/${id}/${postId}/comments`}
      >
        To comments
      </Link>
    </div>
  );
};
