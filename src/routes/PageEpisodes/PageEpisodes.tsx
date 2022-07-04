import React from 'react';
import { TittleBlock } from '../../components/TittleBlock';
import { WritingAnime } from '../../components/WritingAnime';

export const PageEpisodes = () => {
    return (
        <div className='App-children'>
            <TittleBlock tittle={`Multiseries Anime`}/>
            <WritingAnime page={1} url='order_by=episodes&sort=asc' filters={false} new/>
        </div>
    )
}