import { FC } from 'react';
import { Link } from 'react-router-dom';
import './noMatchPage.scss';

export const NoMatchPage: FC = () => (
  <div className="no-match-page">
    <h2>Sorry, there is no such page</h2>
    <p>
      <Link to="/" className="no-match-page__link">Return to the home page</Link>
    </p>
  </div>
);
