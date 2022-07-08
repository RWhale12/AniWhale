import { useEffect, useState } from 'react';
import validator from 'validator';
import './SingInAndUp.scss'
import { IUser } from './SingUp';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'

type SingInProps = {

}

export const SingIn = (props: SingInProps) => {
    const auth = getAuth();
    const [userData, setUserData] = useState<IUser>();

    useEffect(() => {
        isLogin();
    }, [userData])

    async function Validation() {
        const email = (document.querySelector('.sing-input--login-email') as HTMLInputElement).value;
        const valEmail = validator.isEmail(email);
        const pass = (document.querySelector('.sing-input--login-password') as HTMLInputElement).value;
        const valPass = validator.isStrongPassword(pass, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 });
        try {
            if (email && pass) {
                if (valEmail) {
                    if (valPass) {
                        setUserData({ email: email, password: pass });
                    }
                    else { alert('Pass Error') }
                }
                else { alert('Email Error') }
            } else {
                alert('Что-то не Так!')
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function isLogin() {
        console.log(userData)
        if (userData)
            await signInWithEmailAndPassword(auth, userData.email, userData.password).then(() => {
                window.location.assign('/');
            }).catch((error) => {
                alert('Данные входа неверные!')
              });
    }
    return (
        <div className='sing-field sing-field-in'>
            <label className='sing-tittle'>Sing in</label>
            <label className='sing-text'>or use your account</label>
            <input className='sing-input sing-input--login-email' placeholder='Email' type='text' />
            <input className='sing-input sing-input--login-password' placeholder='Password' type='password' />
            <button className='sing-forgot-password'>Forgot your password?</button>
            <button className='sing-button-go' onClick={() => Validation()}>Sing In</button>
        </div>
    )
}