import './SingInAndUp.scss'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { useState } from 'react';
import { SassColor } from 'sass';

type SingUnProps = {

}

type IUser = {
    email: string;
    password: string;
}

export const SingUp = (props: SingUnProps) => {
    const auth = getAuth();
    const [isRegForm, setIsResForm] = useState(false);
    const [userData, setUserData] = useState<IUser>();

    function Validation(){
        const name = (document.querySelector('.sing-input--regestration-name') as HTMLInputElement).value;
        const email = (document.querySelector('.sing-input--regestration-email') as HTMLInputElement).value;
        const pass = (document.querySelector('.sing-input--regestration-pass') as HTMLInputElement).value;
        const conPass = (document.querySelector('.sing-input--regestration-conpass') as HTMLInputElement).value;
        try {
            if(pass === conPass && name && email && pass && conPass){
                isReg()
            } else {
                alert('Что-то не заполнено!')
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function isReg() {
        try {
            if(userData) alert('Пользователь зарегестрирован!')
            // await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        } catch (e: any) {
            console.log(e.message)
        }
    }


    return (
        <div className='sing-field sing-field-up'>
            <label className='sing-tittle'>Create Account</label>
            <label className='sing-text'>or use your email for registration</label>
            <input className='sing-input sing-input--regestration-name' placeholder='Name' type='text' />
            <input className='sing-input sing-input--regestration-email' placeholder='Email' type='text' />
            <input className='sing-input sing-input--regestration-pass' placeholder='Password' type='password' />
            <input className='sing-input sing-input--regestration-conpass' placeholder='Confirm Password' type='password' />
            <button className='sing-button-go' onClick={() => Validation}>Sing Up</button>
        </div>
    )
}