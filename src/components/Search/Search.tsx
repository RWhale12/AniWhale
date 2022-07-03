import './Search.scss'

import seachIcon from '../../icons/search.png'
import { Link } from 'react-router-dom'

export const Search = () => {

    function writeInputSearch(){
        const text = (document.querySelector('.search-input') as HTMLInputElement).value;
        const check = text.replace(/^\s+|\s+$/g, '')

        if(check) {
            window.location.assign(`/search/${text}`);
        }else {
            return alert('The Search Bar Is Empty!');
        }
        
    }

    return(
        <div className='search'>
            <img src={seachIcon} alt=""  className='search-icon'/>
            <input type="text"  placeholder='Search Anime...' className='search-input'/>
            <button className='search-button' onClick={() => writeInputSearch()}>Search</button>
            
        </div>
    )
}