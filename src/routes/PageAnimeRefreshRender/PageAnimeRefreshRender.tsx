import React, { useState } from 'react';
import { TittleBlock } from '../../components/TittleBlock';
import { WritingAnime } from '../../components/WritingAnime';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { PageEpisodesSpecificAnime } from '../PageEpisodesSpecificAnime/PageEpisodesSpecificAnime';
import { PageSpecificAnime } from '../PageSpecificAnime';

interface PageAnimeRefreshProps {
    tittle?: string;
    url?: string;
    animeID?: number;
    animeIDEpis?: number;
}

export class PageAnimeRefreshRender extends React.Component<PageAnimeRefreshProps>{
    constructor (props: PageAnimeRefreshProps){
        super(props);
    }

    componentDidUpdate(){
        window.location.reload();
    }

    render(){
        return (
            <div className='App-children'>
                {this.props.tittle && <TittleBlock tittle={this.props.tittle}/>}
                {this.props.url && <WritingAnime page={1} url={`min_score=4&${this.props.url}`} filters={false} />}
                {this.props.animeID && <PageSpecificAnime id = {this.props.animeID}/>}
                {this.props.animeIDEpis && <PageEpisodesSpecificAnime id = {this.props.animeIDEpis}/>}
            </div>
        )
    }
}