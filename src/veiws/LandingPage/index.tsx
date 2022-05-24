import {Navigation} from "../Navigation";
import './landingPage.scss';
import {Users} from "../Users";
import React from "react";

export const LandingPage = () => {


    return (
        <div className='landing-page'>
            <Navigation/>
            <Users/>
        </div>
    )
}