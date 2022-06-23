import './FieldChange.scss'

type FieldChangeProps = {
    tittle:string;
    text:string;
    buttonClick: () => void;
    textButton: string;
}

export const FieldChange = (props: FieldChangeProps) => {
    return (
        <div className='sing-field sing-change-field'>
            <div className='sing-change-field--bg'></div>
            <div className='sing-change-field--div-text'>
                    <label className='sing-change-field--title'>{props.tittle}</label>
                    <label className='sing-change-field--text'>{props.text}</label>
                    <button onClick={props.buttonClick} className='sing-change-field--button'>{props.textButton}</button>
            </div>
            
        </div>
    )
}