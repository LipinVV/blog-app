import {useContext, useEffect} from 'react';
import {StoreContext} from "../../store";
import {ACTION} from "../../actions";
import {Link} from "react-router-dom";
import {UserType} from "../../types";
import {useLocation} from "react-router";
import './users.scss';


export const Users = () => {
    const { state, dispatch } = useContext(StoreContext);
    const location = useLocation();

    const fetchUsers = async () => {
        try {
            await fetch('https://jsonplaceholder.typicode.com/users')
                .then((response) => response.json())
                .then((data) => dispatch({action: ACTION.LOAD_USERS, data: data}));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);

    if(!state.users.length) return <div>Loading users</div>

    return (
        <div className='users'>
            <h1 className='users__header'>They've bought tickets:</h1>
            {state.users.map((user: UserType) => {
                return (
                    <div className='users__user-card' key={user.id}>
                        <span className='users__user-card-name'>{user.username}</span>
                        <span className='users__user-card-city'>{user.address.city}</span>
                        <Link
                            className='users__link'
                            to={`/users/${user.username}/${user.id}`}>Watch profile
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}