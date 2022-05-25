import { FC } from 'react';
import { Link } from 'react-router-dom';
import './navigation.scss';

export const Navigation: FC = () => (
  <div className="navigation">
    <section className="navigation__bar">
      <Link to="/" className="navigation__header">Free Speak</Link>
      <div className="navigation__links">
        <Link to="/" className="navigation__link">For the visually impaired</Link>
        <Link to="/" className="navigation__link">My profile</Link>
      </div>
    </section>
  </div>
);
