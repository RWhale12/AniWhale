import React from 'react';
import { AfishaPopular } from '../../components/AfishaPopular';
import { WritingAnime } from '../../components/WritingAnime';

export const PageHome = () => {
    return (
        <div className='App-children'>
            <AfishaPopular />
            <WritingAnime page={1} url='order_by=members&sort=desc' filters />
        </div>
    )
}