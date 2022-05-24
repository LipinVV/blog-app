import React from "react";
import {Link, Outlet} from "react-router-dom";
import './navigation.scss';

export const Navigation = () => {

    return (
        <div className='navigation'>
            <ul className='navigation__links'>
                <Link className='navigation__link' to='/users'>Users</Link>
            </ul>
            <hr/>
            <Outlet />
        </div>
    )
}