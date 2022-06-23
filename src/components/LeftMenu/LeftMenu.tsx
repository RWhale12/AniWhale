import { ButtonLeftMenu } from '../ButtonLeftMenu'
import './LeftMenu.scss'

import all from '../../icons/menu-all.png'
import ganres from '../../icons/menu-ganres.png'
import top from '../../icons/menu-top.png'
import ongoing from '../../icons/menu-ongoing.png'
import multi from '../../icons/menu-multi.png'
import news from '../../icons/menu-new.png'
import year from '../../icons/menu-year.png'

export const LeftMenu = () => {
    return(
        <div className='left-menu'>
            <div className='left-menu-bg'></div>
            <ButtonLeftMenu text='All Anime' icon={all}/>
            <ButtonLeftMenu text='New' icon={news}/>
            <ButtonLeftMenu text='Ongoings' icon={ongoing}/>
            <ButtonLeftMenu text='Top 100 Anime' icon={top}/>
            <ButtonLeftMenu text='Anime by genre' icon={ganres}/>
            <ButtonLeftMenu text='Anime by year' icon={year}/>
            <ButtonLeftMenu text='Multiseries' icon={multi}/>
        </div>
    )
}