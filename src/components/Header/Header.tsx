import './Header.scss';

import logo from '../../icons/logo.png'
import { Search } from '../Search';
import sing from '../../icons/sing.png'

type HeaderProps = {
    
}

export const Header = (props: HeaderProps) => {
    return(
        <div className='header'>
            <div className='header--logo'>
                <img src={logo} alt="" className='header--logo-img'/>
            </div>
            <div className='header--nav'>
                <Search />
                <button className='header--button-auth'><img alt='' src={sing} className='header--button-auth--img'></img>SingIn/SingUp</button>
            </div>
        </div>
    )
}