import React, {useContext, useEffect} from 'react';
import {StoreContext} from "../../store";
import {ACTION} from "../../actions";
import {Link} from "react-router-dom";
import {UserType} from "../../types";
import './users.scss';
import {useLocation} from "react-router";


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

    const numberOfUsersToSlice = 4;
    const usersToRender = location.pathname === '/' ? state.users.slice(0, numberOfUsersToSlice) : state.users;

    if(!state.users.length) return <div>Loading users</div>

    return (
        <div className='users'>
            <h1 className='users__header'>They've bought tickets:</h1>
            {usersToRender.map((user: UserType) => {
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