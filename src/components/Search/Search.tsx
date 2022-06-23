import './Search.scss'

import seachIcon from '../../icons/search.png'

export const Search = () => {
    return(
        <div className='search'>
            <img src={seachIcon} alt=""  className='search-icon'/>
            <input type="text"  placeholder='Search Anime...' className='search-input'/>
            <button className='search-button'>Search</button>
        </div>
    )
}