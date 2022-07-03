import React from 'react';
import { TittleBlock } from '../../components/TittleBlock';
import { WritingAnime } from '../../components/WritingAnime';

export const PageTop = () => {
    return (
        <div className='App-children'>
            <TittleBlock tittle={`Top 100 Anime`}/>
            <WritingAnime page={1} url='order_by=score&sort=desc' filters={false} top/>
        </div>
    )
}