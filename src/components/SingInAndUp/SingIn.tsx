import './SingInAndUp.scss'

type SingInProps ={

}

export const SingIn = (props: SingInProps) => {
    return(
        <div className='sing-field sing-field-in'>
            <label className='sing-tittle'>Sing in</label>
            <label className='sing-text'>or use your account</label>
            <input className='sing-input' placeholder='Email' type='text'/>
            <input className='sing-input' placeholder='Password' type='password'/>
            <button className='sing-forgot-password'>Forgot your password?</button>
            <button className='sing-button-go'>Sing In</button>
        </div>
    )
}