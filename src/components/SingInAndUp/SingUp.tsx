import './SingInAndUp.scss'
import { getAuth, createUserWithEmailAndPassword, updateProfile, sendEmailVerification } from 'firebase/auth'
import { useState } from 'react';
import { SassColor } from 'sass';
import validator from 'validator'
import { getDatabase, set, ref } from "firebase/database";
import { setDoc, doc } from 'firebase/firestore';
import { db } from '../../index'
import { access } from 'fs';



type SingUnProps = {

}

export type IUser = {
    email: string;
    password: string;
}



export const SingUp = (props: SingUnProps) => {
    const auth = getAuth();
    const [isRegForm, setIsResForm] = useState(false);
    const [userData, setUserData] = useState<IUser>();
    const database = getDatabase();
    // const[errorValidName, setErrorValid]

    function Validation() {
        const name = (document.querySelector('.sing-input--regestration-name') as HTMLInputElement).value;
        const valName = validator.isStrongPassword(name, { minLength: 5, minLowercase: 1, minUppercase: 1, minNumbers: 0, minSymbols: 0 });
        const email = (document.querySelector('.sing-input--regestration-email') as HTMLInputElement).value;
        const valEmail = validator.isEmail(email);
        const pass = (document.querySelector('.sing-input--regestration-pass') as HTMLInputElement).value;
        const valPass = validator.isStrongPassword(pass, { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 0 });
        const conPass = (document.querySelector('.sing-input--regestration-conpass') as HTMLInputElement).value;
        try {
            if (pass === conPass && name && email && pass && conPass) {
                if (valName) {
                    if (valEmail) {
                        if (valPass) {
                            setUserData({ email: email, password: pass });
                            isReg(name);
                            alert('Account has been successfully registered');
                        }
                        else { alert('Pass Error') }
                    }
                    else { alert('Email Error') }
                }
                else { alert('Name Error') }


            } else {
                alert('Что-то не Так!')
            }
        } catch (error: any) {
            console.log(error.message)
        }
    }

    async function isReg(name: string) {

        if (userData) {
            await createUserWithEmailAndPassword(auth, userData.email, userData.password).then((userCredential) => {
                updateProfile(userCredential.user, {
                    displayName: name, photoURL: "https://example.com/jane-q-user/profile.jpg"
                });
                sendEmailVerification(userCredential.user);
                console.log('yes reg')
            })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });

            const docRef = await setDoc(doc(db, `users`, `${auth.currentUser?.uid}`), {
                nickname: '',
                country: '',
                gender: '',
                birthday: '',
            });
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
            <button className='sing-button-go' onClick={() => Validation()}>Sing Up</button>
        </div>
    )
}