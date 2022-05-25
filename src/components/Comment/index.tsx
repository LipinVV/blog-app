import { CommentType } from '../../types';
import './comment.scss';

export const Comment = ({
  id, body, email, name,
}: CommentType) => (
  <div className="comment">
    <span>
      №:
      {id}
    </span>
    <span>
      Name:
      {name}
    </span>
    <span>
      Email:
      {email}
    </span>
    <span>
      Text:
      {body}
    </span>
  </div>
);
