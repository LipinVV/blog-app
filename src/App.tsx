import React from 'react';
import {Comments} from "./veiws/Comments";
import {LandingPage} from './veiws/LandingPage';
import {Users} from "./veiws/Users";
import {User} from "./veiws/User";
import {Route, Routes} from "react-router";
import './App.scss';

function App() {
    return (
        <div className="App">
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
