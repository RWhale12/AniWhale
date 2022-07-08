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
            <div className='left-menu--account'></div>
            <ButtonLeftMenu text='Home' icon={all} link='/'/>
            <ButtonLeftMenu text='New' icon={news} link='/new'/>
            <ButtonLeftMenu text='Top 100 Anime' icon={top} link='/top'/>
            <ButtonLeftMenu text='Ongoings' icon={ongoing} link='/ongoing'/>
            <ButtonLeftMenu text='Multiseries' icon={multi} link='/episodes'/>
            <ButtonLeftMenu text='Anime by genre' icon={ganres} link='/genres'/>
            <ButtonLeftMenu text='Anime by year' icon={year} link='/years'/>
        </div>
    )
}