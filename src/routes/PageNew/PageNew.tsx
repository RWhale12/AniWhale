import React from 'react';
import { TittleBlock } from '../../components/TittleBlock';
import { WritingAnime } from '../../components/WritingAnime';

export const PageNew = () => {
    return (
        <div className='App-children'>
            <TittleBlock tittle={`New Anime`}/>
            <WritingAnime page={1} url='order_by=start_date&sort=asc&start_date=2022&min_score=4' filters={false} new/>
        </div>
    )
}