import './SingInAndUp.scss'

type SingUnProps ={

}

export const SingUp = (props: SingUnProps) => {
    return(
        <div className='sing-field sing-field-up'>
            <label className='sing-tittle'>Create Account</label>
            <label className='sing-text'>or use your email for registration</label>
            <input className='sing-input' placeholder='Name' type='text'/>
            <input className='sing-input' placeholder='Email' type='text'/>
            <input className='sing-input' placeholder='Password' type='password'/>
            <input className='sing-input' placeholder='Confirm Password' type='password'/>
            <button className='sing-button-go'>Sing Up</button>
        </div>
    )
}