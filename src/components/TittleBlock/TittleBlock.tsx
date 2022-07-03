import './TittleBlock.scss'

type TittleBlockProps = {
    tittle: string;
    text?: string;
}

export const TittleBlock = (props: TittleBlockProps) => {
    return(
        <div className='tittle-block'>
            <div className='tittle-block--bg'></div>
            <label htmlFor="" className='tittle-block--tittle'>{props.tittle}</label>
            {props.text && <label htmlFor="" className='tittle-block--text'>{props.text}</label>}
        </div>
    )
}