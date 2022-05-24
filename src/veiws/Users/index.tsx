import React, {useEffect} from 'react';
import {Link} from "react-router-dom";
import {StateType, UserType} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {fetchUsers} from "../../reducers/usersSlice";
import {AppDispatch} from "../../store";
import './users.scss';

export const Users: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();

    const userList = useSelector((state: StateType) => {
        return state.users;
    });

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if(!userList.length) return <div>Loading users</div>

    return (
        <div className='users'>
            <h1 className='users__header'>They've bought tickets:</h1>
            {userList.map((user: UserType) => {
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