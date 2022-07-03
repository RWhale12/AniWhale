import './Header.scss';

import logo from '../../icons/logo.png'
import { Search } from '../Search';
import sing from '../../icons/sing.png'
import { Link } from 'react-router-dom';

type HeaderProps = {

}

export const Header = (props: HeaderProps) => {
    return (
        <div className='header'>
            <div className='header--logo'>
                <img src={logo} alt="" className='header--logo-img' />
            </div>
            <div className='header--nav'>
                <Search />
                <Link to='/sing'>
                    <button className='header--button-auth'><img alt='' src={sing} className='header--button-auth--img'></img>SingIn/SingUp</button>
                </Link>
            </div>
        </div>
    )
}