import {FC} from "react";
import './landingPage.scss';
import {Users} from "../Users";

export const LandingPage: FC = () => {

    return (
        <div className='landing-page'>
            <section className='landing-page__main-section'>
                <h1 className='landing-page__main-section-header'>Welcome!</h1>
                <h4 className='landing-page__main-section-sub-header'>explore new edges of freedom</h4>
            </section>
            <Users/>
        </div>
    )
}