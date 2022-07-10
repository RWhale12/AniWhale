import './Header.scss';
import { getDatabase, ref, onValue, get, child } from "firebase/database";

import logo from '../../icons/logo.png'
import { Search } from '../Search';
import sing from '../../icons/sing.png'
import { Link } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { userInfo } from 'os';
import { useEffect, useState } from 'react';

export type Account = {
    verify: boolean;
    username: string | null;
    email: string | null;
    verified?: boolean | null; 
}

type HeaderProps = {

}

export const Header = (props: HeaderProps) => {
    const database = getDatabase();
    const auth = getAuth();
    const [user, setUser] = useState<Account>();
    const [visible, setVisible] = useState<number>(0)
    // console.log(auth);
    console.log(window.location.href)

    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser({
                    verify: user.emailVerified,
                    username: user.displayName,
                    email: user.email,
                })
                setVisible(1)
            } else {
                setUser(undefined);
                setVisible(2)
            }

        });
    }, []);

    return (
        <div className='header'>

            <div className='header--logo'>
                <Link to='/'>
                    <img src={logo} alt="" className='header--logo-img' />
                </Link>
            </div>

            <div className='header--nav'>
                <Search />
                {!user && visible === 2 && <Link to='/sing'>
                    <button className='header--button-auth'><img alt='' src={sing} className='header--button-auth--img'></img>SingIn/SingUp</button>
                </Link>}
                {user && visible === 1 &&

                    <div className='header-auth' onClick={() => window.location.assign('/account')}>
                        {user.username && <div className='header-auth--avatar'>{(user.username)[0]}</div>}
                            <div className='header-auth--block-info'>
                                <div className='header-auth--block-name'>
                                    <label className='header-auth--name'>{user.username}</label>
                                    {user.verify && <label className='verify-true'>verify</label>}
                                    {!user.verify && <label className='verify-false'>noverify</label>}
                                    
                                </div>

                                <div className='header-auth--email'>{user.email}</div>
                            </div>
                    </div>
                }
            </div>
        </div>
    )
}