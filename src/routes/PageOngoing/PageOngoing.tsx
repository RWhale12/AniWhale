import React from 'react';
import { TittleBlock } from '../../components/TittleBlock';
import { WritingAnime } from '../../components/WritingAnime';

export const PageOngoing = () => {
    return (
        <div className='App-children'>
            <TittleBlock tittle={`Ongoings Anime`}/>
            <WritingAnime page={1} url='status=airing&order_by=score&sort=desc' filters={false}/>
        </div>
    )
}