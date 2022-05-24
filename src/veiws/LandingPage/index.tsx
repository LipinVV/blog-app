import './landingPage.scss';
import {Users} from "../Users";

export const LandingPage = () => {

    return (
        <div className='landing-page'>
            <section className='landing-page__main-section'>
                <h1 className='landing-page__main-section-header'>Rock'n'Roll Band</h1>
                <h4 className='landing-page__main-section-sub-header'>on 27.05.22 at 21:00</h4>
            </section>
            <Users/>
        </div>
    )
}