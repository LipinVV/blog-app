import { Route, Routes } from 'react-router';
import { Comments } from '../../veiws/Comments';
import { LandingPage } from '../../veiws/LandingPage';
import { Users } from '../../veiws/Users';
import { User } from '../../veiws/User';
import { Navigation } from '../../veiws/Navigation';
import { NoMatchPage } from '../NoMatchPage';
import { routes } from '../../routes';
import './App.scss';

const App = () => (
  <div className="App">
    <Navigation />
    <Routes>
      <Route path={routes.indexPage} element={<LandingPage />} />
      <Route path={routes.users} element={<Users />} />
      <Route path={routes.userById} element={<User />} />
      <Route path={routes.commentsByPost} element={<Comments />} />
      <Route path={routes.noMatch} element={<NoMatchPage />} />
    </Routes>
  </div>
);

export default App;
