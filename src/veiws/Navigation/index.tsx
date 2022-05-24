import React from "react";
import {Link} from "react-router-dom";
import './navigation.scss';

export const Navigation = () => {

    return (
        <div className='navigation'>
           <section className='navigation__bar'>
               <h2 className='navigation__header'>Concert club</h2>
               <div className='navigation__links'>
                   <Link to='/' className='navigation__link'>For the visually impaired</Link>
                   <Link to='/' className='navigation__link'>My profile</Link>
               </div>
           </section>
            <section className='navigation__ads-headers'>
                <h1 className='navigation__ads-header'>Rock'n'Roll Band</h1>
                <h4 className='navigation__ads-sub-header'>on 27.05.22 at 21:00</h4>
            </section>
        </div>
    )
}