import { useState } from 'react';
import { FieldChange } from '../FieldChange';
import './PanelSing.scss'

type PanelSingProps = {

}

export const PanelSing = () => {
    const [change, setChange] = useState('si');
    const [textButton, setTextButton] = useState('Sing In');
    const [tittle, setTittle] = useState('Welcome Back!');
    const [textField, setTextField] = useState('To keep connected with us please login with your personal info');

    function changeField() {
        if (change === 'si') {
            document.querySelector('.sing-change-field')?.classList.add('panel-active');
            setTextButton('Sing Up');
            setTittle('Hello, Friend!')
            setTextField('Enter your personal details and start journey with us')
            setChange('su');
        } else if (change === 'su') {
            document.querySelector('.sing-change-field')?.classList.remove('panel-active');
            setTextButton('Sing In')
            setTittle('Welcome Back!')
            setTextField('To keep connected with us please login with your personal info')
            setChange('si');
        }
    }

    return (
        <div className='sing'>
            <div className='sing-field sing-in'>
            </div>
            <div className='sing-field sing-up'>
            </div>
            <FieldChange buttonClick={changeField} tittle={tittle} text={textField} textButton={textButton}/>
        </div>
    )
}