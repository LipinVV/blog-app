import {Comments} from "./veiws/Comments";
import {LandingPage} from './veiws/LandingPage';
import {Users} from "./veiws/Users";
import {User} from "./veiws/User";
import {Route, Routes} from "react-router";
import {Navigation} from "./veiws/Navigation";
import './App.scss';

function App() {
    return (
        <div className="App">
            <Navigation />
            <Routes>
                <Route path='/' element={<LandingPage />}/>
                <Route path='/users' element={<Users />}/>
                <Route path='/users/:user/:id' element={<User />}/>
                <Route path='/users/:user/:id/:postId/comments' element={<Comments />}/>
            </Routes>
        </div>
    );
}

export default App;
