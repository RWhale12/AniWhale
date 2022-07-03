import { Link } from 'react-router-dom';
import './ButtonLeftMenu.scss'

type ButtonLeftMenuProps = {
    text: string;
    icon: string;
    link: string;
}

export const ButtonLeftMenu = (props: ButtonLeftMenuProps) => {
    return (
        <div>
            <Link to={props.link}>
                <button className='button-left-menu'><img alt='' src={props.icon} className='button-left-menu--img'></img>{props.text}</button>
            </Link>
        </div>
    )
}