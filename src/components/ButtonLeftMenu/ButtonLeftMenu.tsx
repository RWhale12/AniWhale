import './ButtonLeftMenu.scss'

type ButtonLeftMenuProps ={
    text: string;
    icon: string;
}

export const ButtonLeftMenu = (props: ButtonLeftMenuProps) => {
    return (
        <div>
            <button className='button-left-menu'><img alt='' src={props.icon} className='button-left-menu--img'></img>{props.text}</button>
        </div>
    )
}