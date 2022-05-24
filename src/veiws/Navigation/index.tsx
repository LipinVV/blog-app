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
        </div>
    )
}